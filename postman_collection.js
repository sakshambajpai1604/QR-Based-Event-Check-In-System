module.exports = {
  info: {
    _postman_id: "a3a3feff-1f58-46b0-8b8a-75929e0e55da",
    name: "Event Management API",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: [
    {
      name: "Authentication",
      item: [
        {
          name: "User Registration",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "John Doe",
                email: "john@example.com",
                studentId: "123456",
                password: "password123",
                role: "student",
              }),
            },
            url: {
              raw: "http://localhost:5000/api/auth/register",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "auth", "register"],
            },
          },
        },
        {
          name: "User Login",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "john@example.com",
                password: "password123",
              }),
            },
            url: {
              raw: "http://localhost:5000/api/auth/login",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "auth", "login"],
            },
          },
        },
      ],
    },
    {
      name: "Events",
      item: [
        {
          name: "Create Event",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
              {
                key: "Authorization",
                value: "Bearer {{admin_token}}",
              },
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                title: "Hackathon 2025",
                description: "A 24-hour hackathon for developers",
                location: "SRM University",
                date: "2025-12-12",
                time: "09:00 AM",
              }),
            },
            url: {
              raw: "http://localhost:5000/api/events",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "events"],
            },
          },
        },
        {
          name: "Get All Events",
          request: {
            method: "GET",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
            ],
            url: {
              raw: "http://localhost:5000/api/events",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "events"],
            },
          },
        },
        {
          name: "Register for Event",
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
              {
                key: "Authorization",
                value: "Bearer {{user_token}}",
              },
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                eventId: "{{event_id}}",
              }),
            },
            url: {
              raw: "http://localhost:5000/api/events/register/{{event_id}}",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "events", "register", "{{event_id}}"],
            },
          },
        },
      ],
    },
    {
      name: "Admin Functions",
      item: [
        {
          name: "View Attendees",
          request: {
            method: "GET",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
              {
                key: "Authorization",
                value: "Bearer {{admin_token}}",
              },
            ],
            url: {
              raw: "http://localhost:5000/api/admin/events/{{event_id}}/attendees",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "admin", "events", "{{event_id}}", "attendees"],
            },
          },
        },
        {
          name: "Check In Attendee",
          request: {
            method: "PATCH",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
              {
                key: "Authorization",
                value: "Bearer {{admin_token}}",
              },
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                userId: "{{user_id}}",
                eventId: "{{event_id}}",
              }),
            },
            url: {
              raw: "http://localhost:5000/api/admin/checkin",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "admin", "checkin"],
            },
          },
        },
        {
          name: "Export Attendees CSV",
          request: {
            method: "GET",
            header: [
              {
                key: "Content-Type",
                value: "application/json",
              },
              {
                key: "Authorization",
                value: "Bearer {{admin_token}}",
              },
            ],
            url: {
              raw: "http://localhost:5000/api/admin/events/{{event_id}}/export",
              protocol: "http",
              host: ["localhost"],
              port: "5000",
              path: ["api", "admin", "events", "{{event_id}}", "export"],
            },
          },
        },
      ],
    },
  ],
};