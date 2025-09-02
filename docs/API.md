# API Documentation
## Social Media App

This document provides detailed information about the API endpoints available in the Social Media App, including request/response formats, authentication requirements, and example usage.

## Base URL

All API endpoints are relative to the base URL of the application:

```
https://your-app-domain.com/api
```

For local development:

```
http://localhost:3000/api
```

## Authentication

Most API endpoints require authentication via a connected wallet. The application uses OnchainKit for wallet-based authentication.

Authentication is handled through the following process:

1. User connects their wallet using the Connect Wallet button
2. The application verifies the wallet connection and establishes a session
3. Subsequent API requests include the wallet address for authentication

## API Endpoints

### User API

#### Get User Profile

Retrieves a user's profile information based on their wallet address.

- **URL**: `/users/:address`
- **Method**: `GET`
- **Authentication Required**: No
- **URL Parameters**:
  - `address`: The wallet address of the user

**Response**:

```json
{
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "username": "cryptouser",
  "displayName": "Crypto User",
  "bio": "Web3 enthusiast and content creator",
  "avatar": "https://example.com/avatar.jpg",
  "coverImage": "https://example.com/cover.jpg",
  "followersCount": 120,
  "followingCount": 85,
  "postsCount": 42,
  "isFollowing": false,
  "createdAt": "2023-01-15T12:00:00Z",
  "updatedAt": "2023-06-20T15:30:00Z"
}
```

#### Update User Profile

Updates a user's profile information.

- **URL**: `/users/:address`
- **Method**: `PUT`
- **Authentication Required**: Yes (must be the owner of the address)
- **URL Parameters**:
  - `address`: The wallet address of the user
- **Request Body**:

```json
{
  "username": "newusername",
  "displayName": "New Display Name",
  "bio": "Updated bio information",
  "avatar": "https://example.com/new-avatar.jpg",
  "coverImage": "https://example.com/new-cover.jpg"
}
```

**Response**:

```json
{
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "username": "newusername",
  "displayName": "New Display Name",
  "bio": "Updated bio information",
  "avatar": "https://example.com/new-avatar.jpg",
  "coverImage": "https://example.com/new-cover.jpg",
  "followersCount": 120,
  "followingCount": 85,
  "postsCount": 42,
  "updatedAt": "2023-06-21T10:15:00Z"
}
```

#### Follow User

Follows another user.

- **URL**: `/users/:address/follow`
- **Method**: `POST`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `address`: The wallet address of the user to follow

**Response**:

```json
{
  "success": true,
  "isFollowing": true,
  "followersCount": 121
}
```

#### Unfollow User

Unfollows a user.

- **URL**: `/users/:address/unfollow`
- **Method**: `DELETE`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `address`: The wallet address of the user to unfollow

**Response**:

```json
{
  "success": true,
  "isFollowing": false,
  "followersCount": 120
}
```

### Content API

#### Create Post

Creates a new post.

- **URL**: `/posts`
- **Method**: `POST`
- **Authentication Required**: Yes
- **Request Body**:

```json
{
  "content": "This is my first post on the decentralized social media platform!",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/image.jpg"
    }
  ],
  "tags": ["web3", "social", "decentralized"]
}
```

**Response**:

```json
{
  "id": "post_12345",
  "content": "This is my first post on the decentralized social media platform!",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/image.jpg"
    }
  ],
  "tags": ["web3", "social", "decentralized"],
  "author": {
    "address": "0x1234567890abcdef1234567890abcdef12345678",
    "username": "cryptouser",
    "displayName": "Crypto User",
    "avatar": "https://example.com/avatar.jpg"
  },
  "likesCount": 0,
  "commentsCount": 0,
  "repostsCount": 0,
  "createdAt": "2023-06-21T14:30:00Z",
  "onchainReference": {
    "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "blockNumber": 12345678
  }
}
```

#### Get Posts

Retrieves posts for the feed.

- **URL**: `/posts`
- **Method**: `GET`
- **Authentication Required**: No
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Number of posts per page (default: 20)
  - `filter`: Filter type (options: "all", "following", "trending", default: "all")
  - `author`: Filter by author address (optional)

**Response**:

```json
{
  "posts": [
    {
      "id": "post_12345",
      "content": "This is my first post on the decentralized social media platform!",
      "media": [
        {
          "type": "image",
          "url": "https://example.com/image.jpg"
        }
      ],
      "tags": ["web3", "social", "decentralized"],
      "author": {
        "address": "0x1234567890abcdef1234567890abcdef12345678",
        "username": "cryptouser",
        "displayName": "Crypto User",
        "avatar": "https://example.com/avatar.jpg"
      },
      "likesCount": 5,
      "commentsCount": 2,
      "repostsCount": 1,
      "createdAt": "2023-06-21T14:30:00Z",
      "isLiked": false,
      "isReposted": false
    },
    // Additional posts...
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalPosts": 198,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

#### Get Post Details

Retrieves detailed information about a specific post.

- **URL**: `/posts/:id`
- **Method**: `GET`
- **Authentication Required**: No
- **URL Parameters**:
  - `id`: The ID of the post

**Response**:

```json
{
  "id": "post_12345",
  "content": "This is my first post on the decentralized social media platform!",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/image.jpg"
    }
  ],
  "tags": ["web3", "social", "decentralized"],
  "author": {
    "address": "0x1234567890abcdef1234567890abcdef12345678",
    "username": "cryptouser",
    "displayName": "Crypto User",
    "avatar": "https://example.com/avatar.jpg"
  },
  "likesCount": 5,
  "commentsCount": 2,
  "repostsCount": 1,
  "createdAt": "2023-06-21T14:30:00Z",
  "isLiked": false,
  "isReposted": false,
  "onchainReference": {
    "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "blockNumber": 12345678
  },
  "comments": [
    {
      "id": "comment_6789",
      "content": "Great first post!",
      "author": {
        "address": "0xabcdef1234567890abcdef1234567890abcdef12",
        "username": "web3fan",
        "displayName": "Web3 Fan",
        "avatar": "https://example.com/avatar2.jpg"
      },
      "createdAt": "2023-06-21T15:00:00Z",
      "likesCount": 1,
      "isLiked": false
    },
    // Additional comments...
  ]
}
```

#### Like Post

Likes a post.

- **URL**: `/posts/:id/like`
- **Method**: `POST`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `id`: The ID of the post

**Response**:

```json
{
  "success": true,
  "isLiked": true,
  "likesCount": 6
}
```

#### Unlike Post

Removes a like from a post.

- **URL**: `/posts/:id/unlike`
- **Method**: `DELETE`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `id`: The ID of the post

**Response**:

```json
{
  "success": true,
  "isLiked": false,
  "likesCount": 5
}
```

#### Repost/Share

Reposts or shares content.

- **URL**: `/posts/:id/repost`
- **Method**: `POST`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `id`: The ID of the post
- **Request Body** (optional):

```json
{
  "comment": "Check out this amazing post!"
}
```

**Response**:

```json
{
  "success": true,
  "isReposted": true,
  "repostsCount": 2,
  "repost": {
    "id": "repost_54321",
    "originalPost": "post_12345",
    "comment": "Check out this amazing post!",
    "author": {
      "address": "0x9876543210fedcba9876543210fedcba98765432",
      "username": "repostuser",
      "displayName": "Repost User",
      "avatar": "https://example.com/avatar3.jpg"
    },
    "createdAt": "2023-06-21T16:45:00Z"
  }
}
```

### Comment API

#### Create Comment

Adds a comment to a post.

- **URL**: `/posts/:id/comments`
- **Method**: `POST`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `id`: The ID of the post
- **Request Body**:

```json
{
  "content": "This is a great post! Looking forward to more content.",
  "parentCommentId": null
}
```

**Response**:

```json
{
  "id": "comment_9876",
  "content": "This is a great post! Looking forward to more content.",
  "author": {
    "address": "0x9876543210fedcba9876543210fedcba98765432",
    "username": "commentuser",
    "displayName": "Comment User",
    "avatar": "https://example.com/avatar4.jpg"
  },
  "postId": "post_12345",
  "parentCommentId": null,
  "createdAt": "2023-06-21T17:30:00Z",
  "likesCount": 0,
  "isLiked": false
}
```

#### Get Comments

Retrieves comments for a post.

- **URL**: `/posts/:id/comments`
- **Method**: `GET`
- **Authentication Required**: No
- **URL Parameters**:
  - `id`: The ID of the post
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Number of comments per page (default: 20)
  - `sort`: Sort order (options: "newest", "oldest", "popular", default: "newest")

**Response**:

```json
{
  "comments": [
    {
      "id": "comment_9876",
      "content": "This is a great post! Looking forward to more content.",
      "author": {
        "address": "0x9876543210fedcba9876543210fedcba98765432",
        "username": "commentuser",
        "displayName": "Comment User",
        "avatar": "https://example.com/avatar4.jpg"
      },
      "postId": "post_12345",
      "parentCommentId": null,
      "createdAt": "2023-06-21T17:30:00Z",
      "likesCount": 3,
      "isLiked": false,
      "replies": [
        {
          "id": "comment_5432",
          "content": "I agree completely!",
          "author": {
            "address": "0xabcdef1234567890abcdef1234567890abcdef12",
            "username": "web3fan",
            "displayName": "Web3 Fan",
            "avatar": "https://example.com/avatar2.jpg"
          },
          "postId": "post_12345",
          "parentCommentId": "comment_9876",
          "createdAt": "2023-06-21T18:15:00Z",
          "likesCount": 1,
          "isLiked": false
        }
      ]
    },
    // Additional comments...
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalComments": 2,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

### Discovery API

#### Get Trending Topics

Retrieves trending hashtags and topics.

- **URL**: `/trending`
- **Method**: `GET`
- **Authentication Required**: No
- **Query Parameters**:
  - `limit`: Number of trending topics to return (default: 10)
  - `timeframe`: Time period for trending calculation (options: "day", "week", "month", default: "day")

**Response**:

```json
{
  "topics": [
    {
      "tag": "web3",
      "postCount": 1250,
      "trend": "+15%"
    },
    {
      "tag": "defi",
      "postCount": 980,
      "trend": "+8%"
    },
    {
      "tag": "nft",
      "postCount": 750,
      "trend": "-3%"
    },
    // Additional topics...
  ]
}
```

#### Search Content

Searches for posts, users, or topics.

- **URL**: `/search`
- **Method**: `GET`
- **Authentication Required**: No
- **Query Parameters**:
  - `q`: Search query
  - `type`: Type of content to search (options: "posts", "users", "topics", "all", default: "all")
  - `page`: Page number (default: 1)
  - `limit`: Number of results per page (default: 20)

**Response**:

```json
{
  "query": "web3",
  "type": "all",
  "results": {
    "posts": [
      {
        "id": "post_12345",
        "content": "This is my first post on the decentralized social media platform! #web3",
        "author": {
          "address": "0x1234567890abcdef1234567890abcdef12345678",
          "username": "cryptouser",
          "displayName": "Crypto User",
          "avatar": "https://example.com/avatar.jpg"
        },
        "createdAt": "2023-06-21T14:30:00Z",
        "likesCount": 5,
        "commentsCount": 2,
        "repostsCount": 1
      },
      // Additional posts...
    ],
    "users": [
      {
        "address": "0xabcdef1234567890abcdef1234567890abcdef12",
        "username": "web3fan",
        "displayName": "Web3 Fan",
        "avatar": "https://example.com/avatar2.jpg",
        "bio": "Passionate about Web3 technology and decentralization",
        "followersCount": 85
      },
      // Additional users...
    ],
    "topics": [
      {
        "tag": "web3",
        "postCount": 1250,
        "trend": "+15%"
      },
      {
        "tag": "web3social",
        "postCount": 450,
        "trend": "+25%"
      },
      // Additional topics...
    ]
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {
    // Additional error details if available
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication required or invalid credentials
- `FORBIDDEN`: Authenticated user doesn't have permission for the requested action
- `NOT_FOUND`: Requested resource not found
- `VALIDATION_ERROR`: Invalid request parameters or body
- `RATE_LIMITED`: Too many requests, rate limit exceeded
- `INTERNAL_ERROR`: Server-side error

## Rate Limiting

API endpoints are subject to rate limiting to prevent abuse. Rate limits are applied per IP address and/or wallet address.

Current rate limits:
- 100 requests per minute for authenticated users
- 30 requests per minute for unauthenticated users

When a rate limit is exceeded, the API will respond with a 429 Too Many Requests status code and the following response:

```json
{
  "error": true,
  "code": "RATE_LIMITED",
  "message": "Rate limit exceeded. Please try again later.",
  "details": {
    "retryAfter": 60,
    "limit": 100,
    "remaining": 0,
    "reset": "2023-06-21T18:30:00Z"
  }
}
```

## Webhook API (Future Implementation)

The application will support webhooks for real-time notifications of events. This feature is planned for future implementation.

## API Versioning

The API uses versioning to ensure backward compatibility as new features are added. The current version is v1, which is implied in the base URL.

Future versions will be explicitly specified in the URL path:

```
/api/v2/posts
```

## Conclusion

This API documentation provides a comprehensive guide to the endpoints available in the Social Media App. Developers can use these endpoints to interact with the application programmatically, build integrations, or develop custom clients.

For any questions or issues related to the API, please contact the development team or submit an issue in the project repository.

