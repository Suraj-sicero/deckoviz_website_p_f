// test_db_url.js
import { URL } from "url";

const testUrls = [
  "postgres://postgres:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  "postgresql://postgres:password@pooler.supabase.com:6543/postgres",
  "postgres://postgres.xedmnwhljuhbewqykggz:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
];

testUrls.forEach((url, i) => {
  let dbUrl = url;
  try {
    const parsedUrl = new URL(dbUrl);
    if (parsedUrl.hostname.includes("pooler.supabase.com")) {
      parsedUrl.hostname = "aws-0-ap-southeast-1.pooler.supabase.com";
      let username = parsedUrl.username;
      if (username && !username.includes("xedmnwhljuhbewqykggz")) {
        parsedUrl.username = `${username}.xedmnwhljuhbewqykggz`;
      }
      dbUrl = parsedUrl.toString();
    }
  } catch (err) {
    console.error("Failed to parse", err);
  }
  console.log(`Test ${i + 1}:`);
  console.log(`  Input:  ${url}`);
  console.log(`  Output: ${dbUrl}`);
});
