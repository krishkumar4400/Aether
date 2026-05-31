# 🚀 Aether Backend

> A production-oriented social media backend engineered to explore how modern platforms like Instagram, Twitter, and LinkedIn are built under the hood.

Aether is not a simple CRUD project. It is designed to simulate real-world backend engineering concepts including scalable database architecture, feed generation, authentication systems, media processing pipelines, aggregation queries, indexing strategies, and performance optimization.

---

# 🌟 Features

## 🔐 Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Secure HTTP-only Cookies
- Password Hashing with bcrypt
- OTP Verification System
- Password Reset Workflow
- Route Protection Middleware
- Authorization Checks

---

## 👤 User Management

- User Profiles
- Profile Picture Support
- Bio & Website Information
- Public / Private Accounts
- Account Verification
- Follow Request Management

---

## 📸 Posts

- Create Posts
- Upload Images
- Media Optimization
- Store Media URLs
- Delete Posts
- Fetch Posts
- User-specific Posts

---

## ❤️ Social Features

- Follow Users
- Unfollow Users
- Like Posts
- Unlike Posts
- Share Posts
- Save Posts
- Comment System
- Followers & Following Tracking

---

## 📊 Statistics Engine

Dedicated collections for maintaining scalable counters:

### User Stats

- Followers Count
- Following Count
- Posts Count

### Post Stats

- Likes Count
- Comments Count
- Shares Count
- Saves Count

Uses MongoDB atomic updates (`$inc`) for concurrency-safe operations.

---

## ⚡ Feed System

- Home Feed Generation
- Following-based Feed
- Aggregation Pipelines
- Cursor Pagination
- Optimized Query Design
- Compound Indexing

---

## 🖼️ Media Pipeline

Integrated with ImageKit for:

- CDN Delivery
- Automatic Compression
- WEBP Conversion
- Responsive Resizing
- Optimized Media URLs

---

# 🏗️ Architecture

```text
Client
   │
   ▼
Express API Server
   │
   ▼
Authentication Layer
   │
   ▼
Controllers
   │
   ▼
MongoDB Database
   │
   ├── Users
   ├── Posts
   ├── UserStats
   ├── PostStats
   ├── Follows
   ├── Likes
   ├── Shares
   └── Comments
   │
   ▼
ImageKit CDN
```

---

# 🗄️ Database Design

## Users

Stores user account information.

```text
username
email
passwordHash
fullName
bio
profilePicture
website
isPrivate
isVerified
```

---

## UserStats

Stores scalable user counters.

```text
followersCount
followingCount
postsCount
```

---

## Posts

Stores post metadata.

```text
userId
caption
mediaType
mediaUrl
```

---

## PostStats

Stores engagement metrics.

```text
likesCount
commentsCount
sharesCount
savesCount
```

---

## Follows

Stores user relationships.

```text
followerId
followingId
status
```

Status values:

```text
pending
accepted
```

---

## Likes

Tracks user likes.

```text
userId
postId
```

---

## Shares

Tracks post shares.

```text
userId
postId
```

---

## Comments

Stores comments and replies.

```text
postId
userId
content
parentCommentId
```

---

# ⚙️ Backend Engineering Concepts

## MongoDB Indexing

Optimized query patterns using indexes.

Example:

```js
postSchema.index({ userId: 1, createdAt: -1 });
```

Used for:

- Feed Queries
- User Posts
- Recent Content Retrieval

---

## Aggregation Pipelines

Efficient data fetching using:

```text
$lookup
$match
$sort
$limit
$unwind
```

Allows fetching:

```text
Post
+ User Information
+ Post Statistics
```

in a single query.

---

## Cursor Pagination

Infinite scroll implementation using:

```js
createdAt: { $lt: cursor }
```

instead of:

```js
skip()
```

Benefits:

- Faster Queries
- Better Scalability
- Production-Ready Pagination

---

## Atomic Updates

Counters are updated using:

```js
$inc
```

Example:

```js
await PostStats.updateOne(
  { postId },
  {
    $inc: {
      likesCount: 1
    }
  }
);
```

Prevents race conditions.

---

# 📦 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## Media

- ImageKit

## File Upload

- Multer

---

# 📂 Project Structure

```text
src
│
├── config
│
├── controllers
│
├── middleware
│
├── models
│
├── routes
│
├── services
│
├── utils
│
└── server.js
```

---

# 🔥 Core Workflows

## Create Post

```text
Upload Image
      │
      ▼
Multer
      │
      ▼
ImageKit Upload
      │
      ▼
Optimized URL Generation
      │
      ▼
Store Post
      │
      ▼
Create PostStats
```

---

## Follow User

```text
Send Follow Request
        │
        ▼
Create Follow Record
        │
        ▼
Status = Pending
        │
        ▼
Accept / Reject
        │
        ▼
Status = Accepted
```

---

## Feed Generation

```text
Get Following List
        │
        ▼
Fetch Posts
        │
        ▼
Join User Data
        │
        ▼
Join Stats Data
        │
        ▼
Sort By Latest
        │
        ▼
Cursor Pagination
```

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=
```

---

## Run Development Server

```bash
npm run dev
```

---

# 🎯 Learning Objectives

This project focuses on understanding:

- Production Backend Architecture
- MongoDB Data Modeling
- Database Indexing
- Aggregation Pipelines
- Authentication Systems
- Feed Generation
- Media Processing
- Query Optimization
- System Design Fundamentals

---

# 🔮 Future Improvements

- Redis Caching
- Real-time Notifications
- Socket.io Integration
- Stories System
- Reels Support
- Recommendation Engine
- Feed Ranking Algorithms
- Background Workers
- Event-Driven Architecture
- AI-Powered Feed Personalization

---

# 👨‍💻 Developer Notes

This project is built with a strong focus on backend engineering, scalability, performance, and real-world architecture patterns rather than simply recreating UI features.

The objective is to understand how large-scale social media systems work behind the scenes and to apply production-grade development practices while building them.

---
