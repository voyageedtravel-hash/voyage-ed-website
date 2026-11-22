// Shared JS for the LMS pages.  Just the API base — both login.html
// and chat.html include this before their page-specific script runs.
//
// Points at the same Render-hosted CRM backend that the rest of the
// site already uses.  If the backend URL ever changes, flip it here.
const LMS_API = 'https://voyage-crm.onrender.com';
