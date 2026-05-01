import * as THREE from 'three';
import { WorldSchema } from './types';

// ── Toon gradient map ─────────────────────────────────────────────────────────
function makeToonGradient(steps: number[] = [40, 120, 200, 255]): THREE.DataTexture {
  const data = new Uint8Array(steps.length * 4);
  steps.forEach((v, i) => { data[i*4]=v; data[i*4+1]=v; data[i*4+2]=v; data[i*4+3]=255; });
  const tex = new THREE.DataTexture(data, steps.length, 1);
  tex.needsUpdate = true;
  tex.minFilter = tex.magFilter = THREE.NearestFilter;
  return tex;
}

// Cached gradient
let _toonGrad: THREE.DataTexture | null = null;
function toonGrad() { if (!_toonGrad) _toonGrad = makeToonGradient(); return _toonGrad; }

function toon(color: number, emissive = 0x000000, emissiveIntensity = 0): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ color, gradientMap: toonGrad(), emissive, emissiveIntensity });
}

// ── Terrain height ────────────────────────────────────────────────────────────
export function sampleTerrainHeight(x: number, z: number, terrain: WorldSchema['terrain']): number {
  const n = Math.sin(x*0.04+1.3)*Math.cos(z*0.04+2.7)
          + Math.sin(x*0.08+0.5)*Math.cos(z*0.08+1.1)*0.5
          + Math.sin(x*0.16)*Math.cos(z*0.16)*0.25;
  switch (terrain) {
    case 'island':  return Math.max(-1, n*8);
    case 'lava':    return n > 0 ? n*30 : Math.max(n*8,-2);
    case 'forest':  return n*15;
    case 'desert':  return Math.abs(n)*12;
    case 'snow':    return n*20;
    case 'city':    return n*3;
    default:        return n*12;
  }
}

function islandMask(x: number, z: number) { return x*x+z*z < 160*160; }

// ── Terrain ───────────────────────────────────────────────────────────────────
function buildTerrain(scene: THREE.Scene, s: WorldSchema) {
  const SIZE=700, SEGS=80;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGS, SEGS);
  const pos = geo.attributes.position;
  for (let i=0; i<pos.count; i++) {
    const x=pos.getX(i), y=pos.getY(i);
    let h = sampleTerrainHeight(x,y,s.terrain);
    if (s.features.island) h = islandMask(x,y) ? Math.max(0.5,h) : -3;
    pos.setZ(i, h);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, toon(s.palette.ground));
  mesh.rotation.x = -Math.PI/2; mesh.position.y = -5;
  mesh.receiveShadow = true; scene.add(mesh);

  // Background mountains for depth
  if (['forest','island','desert','generic'].includes(s.terrain)) {
    const mg = new THREE.PlaneGeometry(1200, 300, 40, 20);
    const mp = mg.attributes.position;
    for (let i=0; i<mp.count; i++) {
      const x=mp.getX(i), y=mp.getY(i);
      mp.setZ(i, Math.abs(Math.sin(x*0.01+0.5)*Math.cos(x*0.008)*60 + Math.sin(x*0.025)*30));
    }
    mg.computeVertexNormals();
    const mountain = new THREE.Mesh(mg, toon(s.palette.rock));
    mountain.rotation.x = -Math.PI/2; mountain.position.set(0, -5, -350);
    scene.add(mountain);
  }

  if (s.terrain === 'lava') {
    const pg = new THREE.PlaneGeometry(SIZE, SIZE, 32, 32);
    const pp = pg.attributes.position;
    for (let i=0; i<pp.count; i++) {
      const v = sampleTerrainHeight(pp.getX(i), pp.getY(i),'lava');
      pp.setZ(i, v>0 ? -5 : v*3);
    }
    pg.computeVertexNormals();
    const pool = new THREE.Mesh(pg, toon(0xff3300, 0xff1100, 1.5));
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(0, -6.5, 0);
    scene.add(pool);
  }
}

// ── Water ─────────────────────────────────────────────────────────────────────
function buildWater(scene: THREE.Scene, s: WorldSchema, updatables: Function[]) {
  if (!s.features.water) return;
  const mat = new THREE.MeshToonMaterial({ color: 0x1a8fbf, gradientMap: toonGrad(), emissive: 0x0a4466, emissiveIntensity: 0.2 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000,2000,4,4), mat);
  mesh.rotation.x = -Math.PI/2; mesh.position.y = -5.8; scene.add(mesh);
  updatables.push((t: number) => { mesh.position.y = -5.8 + Math.sin(t*0.8)*0.2; });
}

// ── Grass patches ─────────────────────────────────────────────────────────────
function buildGrass(scene: THREE.Scene, s: WorldSchema) {
  if (!s.features.grass) return;
  const colors = [0x5dc94a, 0x3aaa2e, 0x7ed957];
  for (let i=0; i<400; i++) {
    const a=Math.random()*Math.PI*2, r=Math.random()*140;
    const x=Math.cos(a)*r, z=Math.sin(a)*r;
    if (s.features.island && !islandMask(x,z)) continue;
    const h=1.2+Math.random()*2;
    const blade = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3,h),
      new THREE.MeshToonMaterial({ color: colors[i%3], gradientMap: toonGrad(), side: THREE.DoubleSide })
    );
    blade.position.set(x, sampleTerrainHeight(x,z,s.terrain)-5+h/2, z);
    blade.rotation.y = Math.random()*Math.PI;
    scene.add(blade);
  }
}

// ── Sky (painted gradient + toon clouds) ──────────────────────────────────────
function buildSky(scene: THREE.Scene, s: WorldSchema) {
  // Gradient sky dome
  const geo = new THREE.SphereGeometry(950, 32, 16);
  geo.scale(-1,1,1);
  const zenith  = new THREE.Color(s.sky.zenithColor);
  const horizon = new THREE.Color(s.sky.horizonColor);
  const colors: number[] = [];
  const pos = geo.attributes.position;
  for (let i=0; i<pos.count; i++) {
    const t = Math.max(0, Math.min(1, (pos.getY(i)+950)/1900));
    const c = horizon.clone().lerp(zenith, t);
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));
  const sky = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, depthWrite: false }));
  scene.add(sky);

  // Toon clouds
  if (['clear_day','sunset','storm'].includes(s.sky.mood)) {
    const cloudColor = s.sky.mood==='storm' ? 0x8899aa : 0xffffff;
    for (let c=0; c<12; c++) {
      const cx=(Math.random()-0.5)*800, cz=-100-Math.random()*500, cy=80+Math.random()*80;
      const grp = new THREE.Group();
      for (let b=0; b<5; b++) {
        const r=20+Math.random()*30;
        const ball = new THREE.Mesh(
          new THREE.SphereGeometry(r,8,6),
          new THREE.MeshToonMaterial({ color: cloudColor, gradientMap: toonGrad() })
        );
        ball.position.set((Math.random()-0.5)*60,(Math.random()-0.5)*15,(Math.random()-0.5)*20);
        grp.add(ball);
      }
      grp.position.set(cx,cy,cz); scene.add(grp);
    }
  }

  if (s.sky.mood==='night_stars'||s.sky.mood==='twilight_purple') {
    const sg=new THREE.BufferGeometry();
    const sp=new Float32Array(4000*3);
    for (let i=0; i<sp.length; i++) sp[i]=(Math.random()-0.5)*1800;
    sg.setAttribute('position',new THREE.BufferAttribute(sp,3));
    scene.add(new THREE.Points(sg, new THREE.PointsMaterial({color:0xffffff,size:0.5,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending,depthWrite:false})));
  }

  scene.fog = new THREE.FogExp2(s.fog.color, s.fog.density);
  scene.background = new THREE.Color(s.sky.horizonColor);
}

// ── Lighting ──────────────────────────────────────────────────────────────────
function buildLighting(scene: THREE.Scene, s: WorldSchema) {
  scene.add(new THREE.AmbientLight(s.lighting.ambientColor, s.lighting.ambientIntensity));
  const dir = new THREE.DirectionalLight(s.lighting.dirColor, s.lighting.dirIntensity);
  dir.position.set(100,200,80); dir.castShadow=true;
  dir.shadow.mapSize.set(2048,2048);
  const d=400; dir.shadow.camera.left=-d; dir.shadow.camera.right=d;
  dir.shadow.camera.top=d; dir.shadow.camera.bottom=-d; dir.shadow.camera.far=1000;
  scene.add(dir);
  s.lighting.pointLights.forEach(({color,intensity,x,y,z})=>{
    const pt=new THREE.PointLight(color,intensity,300); pt.position.set(x,y,z); scene.add(pt);
  });
}

// ── House ─────────────────────────────────────────────────────────────────────
function makeHouse(): THREE.Group {
  const g = new THREE.Group();
  const wallColors = [0xf5e6c8, 0xeedad0, 0xfaf0e6];
  const roofColors = [0xc0392b, 0x8b3a3a, 0xa04020];
  const wc = wallColors[Math.floor(Math.random()*3)];
  const rc = roofColors[Math.floor(Math.random()*3)];
  const walls = new THREE.Mesh(new THREE.BoxGeometry(10,8,10), toon(wc));
  walls.position.y=4; walls.castShadow=true; g.add(walls);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(8,5,4), toon(rc));
  roof.position.y=10.5; roof.rotation.y=Math.PI/4; roof.castShadow=true; g.add(roof);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(2,3.5), toon(0x5c3317));
  door.position.set(0,1.75,5.01); g.add(door);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(2,2), new THREE.MeshToonMaterial({color:0xaaddff,emissive:0x224466,emissiveIntensity:0.5,gradientMap:toonGrad()}));
  win.position.set(3,4.5,5.01); g.add(win);
  return g;
}

// ── Tree ──────────────────────────────────────────────────────────────────────
function makeTree(terrain: WorldSchema['terrain']): THREE.Group {
  const g = new THREE.Group();
  const h = 10+Math.random()*14;
  const leafColors = terrain==='island' ? [0x2ecc71,0x27ae60,0x1abc9c] : terrain==='forest' ? [0x1a7a20,0x155c18,0x239630] : [0x2d8c3c,0x206030,0x38a050];
  const lc = leafColors[Math.floor(Math.random()*3)];
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.7,1.2,h,6), toon(0x7c4f1a));
  trunk.position.y=h/2; trunk.castShadow=true; g.add(trunk);
  // Layered cones for pine look
  for (let l=0; l<3; l++) {
    const ly = h*0.5 + l*h*0.18;
    const lr = (h*0.55) * (1-l*0.28);
    const lh = h*0.35 * (1-l*0.2);
    const layer = new THREE.Mesh(new THREE.ConeGeometry(lr,lh,7), toon(lc));
    layer.position.y=ly; layer.castShadow=true; g.add(layer);
  }
  return g;
}

// ── Objects ───────────────────────────────────────────────────────────────────
function buildObjects(scene: THREE.Scene, s: WorldSchema, colliders: THREE.Mesh[]) {
  const addGroup = (m: THREE.Group) => {
    scene.add(m);
    m.traverse((c:any)=>{ if(c instanceof THREE.Mesh){c.castShadow=true;c.receiveShadow=true;colliders.push(c);}});
  };

  const placed: Array<{x:number;z:number}> = [];
  const tooClose=(x:number,z:number,d:number)=>placed.some(p=>Math.hypot(p.x-x,p.z-z)<d);
  const tryPlace=(x:number,z:number,d:number)=>{
    if(s.features.island&&!islandMask(x,z)) return false;
    if(tooClose(x,z,d)) return false;
    placed.push({x,z}); return true;
  };

  // Houses
  if (s.features.houses) {
    const hc = s.features.npc.count<=3 ? 4 : s.features.npc.count<=6 ? 7 : 12;
    let built=0;
    for (let i=0; i<80&&built<hc; i++) {
      const a=Math.random()*Math.PI*2, r=30+Math.random()*100;
      const x=Math.cos(a)*r, z=Math.sin(a)*r;
      if (!tryPlace(x,z,18)) continue;
      const h=makeHouse();
      h.position.set(x, sampleTerrainHeight(x,z,s.terrain)-5, z);
      h.rotation.y=Math.random()*Math.PI*2;
      addGroup(h); built++;
    }
  }

  // Rocks
  if (s.objects.includes('rocks')) {
    for (let i=0; i<40; i++) {
      const a=Math.random()*Math.PI*2, r=20+Math.random()*140;
      const x=Math.cos(a)*r, z=Math.sin(a)*r;
      if (!tryPlace(x,z,6)) continue;
      const sz=2+Math.random()*5;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(sz,0), toon(s.palette.rock));
      rock.scale.set(1,0.6+Math.random()*0.7,1);
      rock.rotation.set(Math.random(),Math.random()*Math.PI,0);
      rock.position.set(x, sampleTerrainHeight(x,z,s.terrain)-5+sz*0.3, z);
      rock.castShadow=true; scene.add(rock); colliders.push(rock);
    }
  }

  // Trees
  if (s.objects.includes('trees')) {
    for (let i=0; i<60; i++) {
      const a=Math.random()*Math.PI*2, r=15+Math.random()*130;
      const x=Math.cos(a)*r, z=Math.sin(a)*r;
      if (!tryPlace(x,z,8)) continue;
      const t=makeTree(s.terrain);
      t.position.set(x, sampleTerrainHeight(x,z,s.terrain)-5, z);
      addGroup(t);
    }
  }

  // Pillars
  if (s.objects.includes('pillars')||s.objects.includes('ruins')) {
    for (let i=0; i<12; i++) {
      const a=Math.random()*Math.PI*2, r=30+Math.random()*120;
      const x=Math.cos(a)*r, z=Math.sin(a)*r;
      if (!tryPlace(x,z,10)) continue;
      const ph=15+Math.random()*25;
      const pillar=new THREE.Mesh(new THREE.CylinderGeometry(1.5,2,ph,8), toon(s.palette.rock));
      pillar.position.set(x,sampleTerrainHeight(x,z,s.terrain)-5+ph/2,z);
      pillar.castShadow=true; scene.add(pillar); colliders.push(pillar);
    }
  }
}

// ── NPCs ──────────────────────────────────────────────────────────────────────
function buildNPCs(scene: THREE.Scene, s: WorldSchema, updatables: Function[]) {
  const count=s.features.npc.count; if(count===0) return;
  const skinColor=s.features.npc.color;
  const shirts=[0x2244aa,0xaa2222,0x22aa44,0x888822,0xaa6622];
  for (let i=0; i<count; i++) {
    const a=Math.random()*Math.PI*2, r=20+Math.random()*80;
    const sx=Math.cos(a)*r, sz=Math.sin(a)*r;
    const npc=new THREE.Group();
    const body=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,1.6,8),toon(shirts[i%shirts.length]));
    body.position.set(0,0.8,0); body.castShadow=true; npc.add(body);
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.38,8,8),toon(skinColor));
    head.position.set(0,1.9,0); head.castShadow=true; npc.add(head);
    const lArm=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,1,6),toon(skinColor));
    lArm.position.set(-0.6,0.8,0); npc.add(lArm);
    const rArm=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,1,6),toon(skinColor));
    rArm.position.set(0.6,0.8,0); npc.add(rArm);
    const lLeg=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,1.2,6),toon(0x224466));
    lLeg.position.set(-0.22,-0.2,0); npc.add(lLeg);
    const rLeg=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,1.2,6),toon(0x224466));
    rLeg.position.set(0.22,-0.2,0); npc.add(rLeg);
    npc.position.set(sx, sampleTerrainHeight(sx,sz,s.terrain)-5, sz);
    scene.add(npc);
    const wr=30+Math.random()*40, ws=0.3+Math.random()*0.4, wo=Math.random()*Math.PI*2;
    const cx=sx, cz=sz;
    updatables.push((t:number)=>{
      const wx=cx+Math.cos(t*ws+wo)*wr, wz=cz+Math.sin(t*ws+wo)*wr;
      const wy=sampleTerrainHeight(wx,wz,s.terrain)-5;
      const nx=cx+Math.cos(t*ws+wo+0.05)*wr, nz=cz+Math.sin(t*ws+wo+0.05)*wr;
      npc.position.set(wx,wy,wz); npc.lookAt(nx,wy,nz);
      const sw=Math.sin(t*5+wo)*0.5;
      lLeg.rotation.x=sw; rLeg.rotation.x=-sw;
      lArm.rotation.x=-sw*0.6; rArm.rotation.x=sw*0.6;
    });
  }
}

// ── Pathways ──────────────────────────────────────────────────────────────────
function buildPathways(scene: THREE.Scene, s: WorldSchema, colliders: THREE.Mesh[]) {
  if (!s.features.pathways) return;
  const pts=[
    new THREE.Vector3(-180,0,-180), new THREE.Vector3(-60,0,-20),
    new THREE.Vector3(0,0,0), new THREE.Vector3(60,0,20), new THREE.Vector3(180,0,180),
  ].map(p=>{ p.y=sampleTerrainHeight(p.x,p.z,s.terrain)-5+0.5; return p; });
  const mesh=new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),150,2.5,8,false),
    toon(s.palette.path)
  );
  mesh.receiveShadow=true; scene.add(mesh); colliders.push(mesh);
}

// ── Particles ─────────────────────────────────────────────────────────────────
function buildParticles(scene: THREE.Scene, s: WorldSchema, updatables: Function[]) {
  if (s.particles==='none') return;
  const COUNT=2000;
  const positions=new Float32Array(COUNT*3);
  for (let i=0; i<positions.length; i++) positions[i]=(Math.random()-0.5)*400;
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const clr:Record<string,number>={embers:0xff6600,dust:0xbbaa88,bubbles:0x88ddff,snow:0xeeeeff,fireflies:0xaaffaa};
  const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:clr[s.particles]??0xffffff,size:s.particles==='embers'?0.9:0.4,transparent:true,opacity:0.85,blending:THREE.AdditiveBlending,depthWrite:false}));
  scene.add(pts);
  const up=s.particles==='snow'?-8:15;
  updatables.push((t:number,dt:number)=>{
    const arr=pts.geometry.attributes.position.array as Float32Array;
    for (let i=1;i<arr.length;i+=3){
      arr[i]+=up*dt; arr[i-1]+=Math.sin(t+i)*dt*3;
      if(up>0&&arr[i]>150) arr[i]=-5;
      if(up<0&&arr[i]<-10) arr[i]=150;
    }
    pts.geometry.attributes.position.needsUpdate=true;
  });
}

// ── Entities (dragons/birds) ──────────────────────────────────────────────────
function buildEntities(scene: THREE.Scene, s: WorldSchema, updatables: Function[]) {
  const hasDragons=s.sky.entities.includes('dragons');
  const hasBirds=s.sky.entities.includes('birds');
  const count=hasDragons?4:hasBirds?6:0; if(count===0) return;
  for (let i=0; i<count; i++) {
    const g=new THREE.Group();
    const col=hasDragons?0x8b0000:0x223344;
    const body=new THREE.Mesh(new THREE.ConeGeometry(2,12,4),toon(col));
    body.rotation.x=Math.PI/2; g.add(body);
    [-1,1].forEach(side=>{
      const wing=new THREE.Mesh(new THREE.PlaneGeometry(14,6),new THREE.MeshToonMaterial({color:col,gradientMap:toonGrad(),side:THREE.DoubleSide}));
      wing.position.set(side*8,0,-2); wing.rotation.y=side*0.3; g.add(wing);
      updatables.push((t:number)=>{ wing.rotation.z=side*(0.2+Math.sin(t*5+i)*0.4); });
    });
    const radius=150+i*35, speed=0.2+Math.random()*0.2, off=(i/count)*Math.PI*2;
    scene.add(g);
    updatables.push((t:number)=>{
      const a=t*speed+off, na=a+0.05;
      g.position.set(Math.cos(a)*radius, 90+Math.sin(t+i)*15, Math.sin(a)*radius);
      g.lookAt(Math.cos(na)*radius, g.position.y, Math.sin(na)*radius);
    });
  }
}

// ── Main Builder ──────────────────────────────────────────────────────────────
export class WorldBuilder {
  private updatables: Function[] = [];
  private colliders:  THREE.Mesh[] = [];
  constructor(private scene: THREE.Scene, private schema: WorldSchema) {}
  build() {
    buildLighting(this.scene, this.schema);
    buildSky(this.scene, this.schema);
    buildTerrain(this.scene, this.schema);
    buildWater(this.scene, this.schema, this.updatables);
    buildGrass(this.scene, this.schema);
    buildPathways(this.scene, this.schema, this.colliders);
    buildObjects(this.scene, this.schema, this.colliders);
    buildNPCs(this.scene, this.schema, this.updatables);
    buildParticles(this.scene, this.schema, this.updatables);
    buildEntities(this.scene, this.schema, this.updatables);
  }
  getUpdatables() { return this.updatables; }
  getColliders()  { return this.colliders; }
}
