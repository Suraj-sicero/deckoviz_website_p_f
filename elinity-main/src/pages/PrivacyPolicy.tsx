import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

/* ─── Animation Variants ──────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const listItemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ─── Types ───────────────────────────────────────────────────── */
interface NavItem {
  href: string;
  label: string;
}

/* ─── Nav items ───────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { href: "#privacy-policy",      label: "Privacy Policy" },
  { href: "#terms-of-service",    label: "Terms of Service" },
  { href: "#security-compliance", label: "Security & Compliance" },
  { href: "#data-processing",     label: "Data Processing Addendum" },
  { href: "#business-associate",  label: "Business Associate Agreement" },
];

/* ─── Reusable animated bullet list ──────────────────────────── */
const AnimatedList: React.FC<{ items: string[] }> = ({ items }) => (
  <motion.ul
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="list-disc list-inside text-gray-300 space-y-2"
  >
    {items.map((item, i) => (
      <motion.li key={i} variants={listItemVariant}>
        {item}
      </motion.li>
    ))}
  </motion.ul>
);

/* ─── Animated section divider ────────────────────────────────── */
const Divider: React.FC = () => (
  <motion.div
    className="my-8 h-px"
    style={{
      // Updated: Blue to Indigo gradient
      background:
        "linear-gradient(90deg, rgba(59,130,246,0.4), rgba(123,63,228,0.05))",
        marginTop: "2rem",
        marginBottom: "2rem",
    }}
    initial={{ scaleX : 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  />
);

/* ─── Section wrapper ─────────────────────────────────────────── */
const Section: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={staggerContainer}
    className="mb-10 scroll-mt-28"
  >
    <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
      {title}
    </motion.h2>
    <motion.div variants={fadeInUp} className="space-y-4">
      {children}
    </motion.div>
  </motion.section>
);

/* ─── Mobile slide-in drawer ──────────────────────────────────── */
const MobileNav: React.FC<{
  open: boolean;
  onClose: () => void;
  activeHref: string;
  onSelect: (href: string) => void;
}> = ({ open, onClose, activeHref, onSelect }) => (
  <AnimatePresence>
    {open && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        {/* Drawer */}
        <motion.div
          key="drawer"
          className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col"
          style={{
            background: "#030014", // Updated dark background
            borderRight: "1px solid rgba(59,130,246,0.2)", // Updated blue border
          }}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/5">
            <span className="text-lg font-bold text-white">Documents</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl leading-none transition-colors"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  onSelect(item.href);
                  onClose();
                }}
                className="block px-4 py-3 rounded-lg text-sm transition-all duration-200"
                style={{
                  color: activeHref === item.href ? "#fff" : "#9ca3af",
                  background:
                    activeHref === item.href
                      ? "rgba(59,130,246,0.15)" // Updated blue background
                      : "transparent",
                  borderLeft:
                    activeHref === item.href
                      ? "2px solid #3B82F6" // Updated blue border
                      : "2px solid transparent",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="px-6 pb-8 border-t border-white/5 pt-4">
            <button
              onClick={() => {
                window.print();
                onClose();
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Print document
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─── Main Component ──────────────────────────────────────────── */
const PrivacyPolicy: React.FC = () => {
  const [activeHref, setActiveHref] = useState<string>("#privacy-policy");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  /* Scroll-progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  /* Highlight active nav item on scroll */
  useEffect(() => {
    const ids = [
      "who-we-are",
      "data-collection",
      "data-use",
      "modifications",
      "applicable-law",
    ];
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveHref(`#${id}`);
          return;
        }
      }
      setActiveHref("#privacy-policy");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#030014] text-white relative overflow-x-hidden"
    >
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #3B82F6, #7B3FE4, #6366f1)", // Updated blue/indigo gradient
        }}
      />

      {/* ── Ambient blobs ── */}
      <div
        className="pointer-events-none fixed top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", // Updated blue glow
          filter: "blur(90px)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-[5%] left-[-120px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #7B3FE4 0%, transparent 70%)", // Updated indigo glow
          filter: "blur(90px)",
        }}
      />

      {/* ── Mobile top bar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4"
        style={{
          background: "rgba(3,0,20,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span className="text-base font-extrabold">Privacy Policy</span>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col gap-[5px] p-1"
          aria-label="Open menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-0.5 rounded"
              style={{ background: "#3B82F6" }} // Updated blue burger
            />
          ))}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <MobileNav
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeHref={activeHref}
        onSelect={setActiveHref}
      />

      {/* ── Page layout ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-16">

        {/* Header */}
        <motion.header
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-blue-100/70 max-w-4xl"
          >
            We want to empower you to make the best decisions about the
            information that you share with us. This Privacy Policy ("Policy")
            details how Elinity, ("we," "us," or "our") collects, uses, and
            protects the personal data of users of Backup Space software,
            services, and products ("Services"). Backup Space is a product
            offered by Elinity.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-sm text-gray-400 mt-4"
          >
            Last updated: February 25, 2025
          </motion.p>

          {/* Animated header underline */}
          <motion.div
            className="mt-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(59,130,246,0.7), rgba(123,63,228,0.05))",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />
        </motion.header>

        <div className="flex flex-col md:flex-row gap-12">

          {/* ── Desktop sidebar ── */}
          <motion.aside
            className="hidden md:block md:w-1/4"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="sticky top-28">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">
                Documents
              </p>
              <nav>
                <ul className="space-y-0">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setActiveHref(item.href)}
                        className="block py-2 pl-4 text-sm transition-all duration-200"
                        style={{
                          color:
                            activeHref === item.href ? "#fff" : "#9ca3af",
                          borderLeft:
                            activeHref === item.href
                              ? "2px solid #3B82F6"
                              : "2px solid transparent",
                          background:
                            activeHref === item.href
                              ? "rgba(59,130,246,0.08)"
                              : "transparent",
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-700 my-6" />

                <button
                  onClick={() => window.print()}
                  className="text-gray-400 hover:text-white pl-4 text-sm transition-colors duration-200"
                >
                  Print
                </button>
              </nav>
            </div>
          </motion.aside>

          {/* ── Main content ── */}
          <motion.main
            className="flex-1 space-y-0"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >

            {/* Who we are */}
            <Section id="who-we-are" title="Who are we?">
              <p className="text-gray-300 leading-relaxed">
                We're Elinity the first ai human connection Platform
                [CHE-411.148.873] Elinity is a platform that helps people
                connect deeply, with themselves and with others. At Elinity, we
                believe that the most important thing in life is who we walk it
                with. The people we love, create with, grow alongside.
              </p>
            </Section>

            <Divider />

            {/* Data Collection */}
            <Section id="data-collection" title="Data Collection">
              <motion.h3
                variants={fadeInUp}
                className="text-xl font-semibold mb-3 text-blue-400"
              >
                Customer-Provided Information
              </motion.h3>

              <p className="text-gray-300 leading-relaxed mb-4">
                We collect personal information from users, including but not
                limited to:
              </p>
              <AnimatedList items={["First and last names", "Email addresses"]} />

              <motion.h3
                variants={fadeInUp}
                className="text-xl font-semibold mb-3 text-blue-400 mt-6"
              >
                Personal Information in Content
              </motion.h3>
              <p className="text-gray-300 leading-relaxed">
                Backup Space provides replication, backup, and data storage
                services. Certain content that is backed up, stored, or hosted
                using our Services may contain personal information.
              </p>

              <motion.h3
                variants={fadeInUp}
                className="text-xl font-semibold mb-3 text-blue-400 mt-6"
              >
                Session Records
              </motion.h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                To ensure security and maintain service quality, we collect data
                such as:
              </p>
              <AnimatedList
                items={[
                  "Session date and times",
                  "Browser type",
                  "Device name and/or identification number",
                  "Other interactions with the Service",
                ]}
              />

              <motion.h3
                variants={fadeInUp}
                className="text-xl font-semibold mb-3 text-blue-400 mt-6"
              >
                Cookies
              </motion.h3>
              <p className="text-gray-300 leading-relaxed">
                We use cookies to enhance your experience, enable certain
                features, and analyze usage. Cookies store session identifiers
                but do not store personally identifiable information. Users may
                configure their browsers to refuse cookies; however, this may
                limit access to some features of the Service.
              </p>
            </Section>

            <Divider />

            {/* Data Use */}
            <Section id="data-use" title="Data Use">
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not have any advertising on our site. Any of the
                information we collect from you may be used in one of the
                following ways:
              </p>
              <AnimatedList
                items={[
                  "To personalize your experience, i.e., your information helps us to better respond to your individual needs;",
                  "To improve our Services, i.e., we continually strive to improve our service based on the information and feedback we receive from you;",
                  "To improve customer service, i.e., your information helps us to more effectively respond to your support needs.",
                ]}
              />
              <p className="text-gray-300 leading-relaxed mt-4">
                Any data that we do have will never be shared except under the
                circumstances described below in Data Disclosure.
              </p>
            </Section>

            <Divider />

            {/* Modifications */}
            <Section id="modifications" title="Modifications to Privacy Policy">
              <p className="text-gray-300 leading-relaxed">
                The Services and our business may change from time to time. As a
                result, at times it may be necessary for Gmelius to make changes
                to this Privacy Policy. Gmelius reserves the right to update or
                modify this Privacy Policy at any time and from time to time. We
                will notify you by email (sent to the e-mail address specified in
                your account) or by means of a notice on this Site of any
                material changes to this Privacy Policy. Please review this
                policy periodically, and especially before you provide any
                Personal Data. Your continued use of the Services after any
                changes or revisions to this Privacy Policy shall indicate your
                agreement with the terms of such revised Privacy Policy.
              </p>
            </Section>

            <Divider />

            {/* Applicable Law */}
            <Section id="applicable-law" title="Applicable Law">
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl p-5 md:p-6"
                style={{
                  background: "rgba(59,130,246,0.07)",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <p className="text-gray-300 leading-relaxed">
                  This Agreement shall be governed in all respects by the
                  substantive laws of Switzerland. Any controversy, claim, or
                  dispute arising out of or relating to the Agreement shall be
                  subject to the jurisdiction of the competent courts of the
                  Canton of Geneva, the jurisdiction of the Swiss Federal Court
                  being expressly reserved.
                </p>
              </motion.div>
            </Section>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;