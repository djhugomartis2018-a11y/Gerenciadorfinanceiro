import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efvdcpvesltcistmsdxc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdmRjcHZlc2x0Y2lzdG1zZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTcwNzgsImV4cCI6MjA5NDk3MzA3OH0.p0NGkZB_QuBM7zAx204_YuNKEq7xFFt-HajsPuUEcSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
