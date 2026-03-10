import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ftxrfurwzpghdzajtoxr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0eHJmdXJ3enBnaGR6YWp0b3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDc3NDMsImV4cCI6MjA4ODEyMzc0M30.susN6eXfnFozPbhOcmZHk3tQVhluPsbmprUPuoWP1O8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);