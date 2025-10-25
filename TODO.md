# TODO: Add Optional Forms Link Field to Events

## Backend Changes

- [x] Add 'forms_link' column to events table in server.js initDB
- [x] Update admin.js POST /events route to accept and store forms_link
- [x] Update admin.js PUT /events/:id route to accept and update forms_link
- [x] Update public.js POST /events/:id/register to check forms_link and handle registration logic (if forms_link present, skip registration)

## Frontend Changes

- [x] Update EventForm.jsx to include forms_link input field
- [x] Update EventRegister.jsx to check for forms_link on event load; if present, redirect to external form; else show normal registration form

## Testing

- [x] Test event creation with forms_link
- [x] Test event update with forms_link
- [x] Test registration redirection when forms_link is set
- [x] Test normal registration when forms_link is empty
