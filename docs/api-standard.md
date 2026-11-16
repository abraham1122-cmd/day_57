


# API Standards

This document defines the naming, versioning, HTTP methods, response shapes, query controls, and status codes used by this API.

## 1. Naming Conventions

- Use lowercase letters for resource names.
- Use plural nouns for collection endpoints.
- Separate words using hyphens (`-`) when necessary.
- Use path parameters to identify individual resources.
- Use query parameters for filtering, sorting, field selection, and pagination.

Examples:

```http
GET /api/v1/restaurants
GET /api/v1/restaurants/1
GET /api/v1/restaurants/1/orders
GET /api/v1/restaurants/1/orders/2
```

## 2. API Versioning

The API uses URI versioning.

The version number appears after `/api` and before the resource name.

Format:

```text
/api/v1/resource
```

Example:

```http
GET /api/v1/restaurants
GET /api/v1/restaurants/1/orders/1
```

When a breaking API change is introduced, a new version can be created, such as `/api/v2`.

## 3. HTTP Methods

The API uses HTTP methods according to their intended purpose.

 Method | Purpose | Example |

 GET | Retrieve resources | `GET /restaurants` |
 POST | Create a resource | `POST /restaurants/1/orders` |
 PATCH | Partially update a resource | `PATCH /orders/1/status` |
 DELETE | Delete a resource | `DELETE /orders/1` |

### Method Rules

- GET must not modify server data.
- POST creates a new resource.
- PATCH updates selected properties of an existing resource.
- DELETE removes a resource.
- Repeating DELETE for an already deleted resource must not cause an error.

## 4. Response Shapes

Collection endpoints return a consistent collection response.

The standard paginated response shape is `Page<T>`:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

Where:

- `data` contains the returned resources.
- `page` identifies the current page.
- `limit` specifies the maximum number of items per page.
- `total` represents the total number of matching resources.
- `totalPages` represents the total number of pages.

`T` represents the resource type, such as an order or restaurant.

Single-resource endpoints return one resource:

```json
{
  "id": 1,
  "restaurantId": 1,
  "status": "Pending"
}
```

Create endpoints return the created resource with HTTP `201 Created` and a `Location` header pointing to the new resource.

Delete endpoints return HTTP `204 No Content` with no response body.

## 5. Query Controls

Query parameters control how collection resources are returned.

### Filtering

Use query parameters to filter resources by their properties.

Example:

```http
GET /api/v1/restaurants/1/orders?status=Pending
```

Multiple filter values can be separated by commas:

```http
GET /api/v1/restaurants/1/orders?status=Pending,Accepted
```

### Sorting

Use the `sort` parameter.

- Without a minus sign (`-`): ascending order.
- With a minus sign (`-`): descending order.

Examples:

```http
GET /api/v1/restaurants/1/orders?sort=id
GET /api/v1/restaurants/1/orders?sort=-id
```

### Field Selection

Use `fields` to request only the properties needed.

Example:

```http
GET /api/v1/restaurants/1/orders?fields=id,status
```

This reduces the response to the selected fields.

### Pagination

Use `page` and `limit` to control the number of returned resources.

Example:

```http
GET /api/v1/restaurants/1/orders?page=2&limit=10
```

- `page` selects the requested page.
- `limit` controls the maximum number of resources per page.

### Reserved Query Names

The following names are reserved for API-level controls:

```text
sort
page
limit
fields
include
```

These names must not be treated as ordinary resource filters.

`include` is reserved for future relationship expansion.

## 6. HTTP Status Codes

The API uses standard HTTP status codes.

Status  Meaning Usage 

 200 | OK  Successful GET or PATCH |
 201 | Created | Resource successfully created |
204 | No Content | Successful DELETE |
400 | Bad Request | Invalid input or query parameter |
404 | Not Found | Requested resource does not exist |
500 | Internal Server Error | Unexpected server error |

### Error Response Example

```json
{
  "statusCode": 404,
  "message": "Order not found",
  "error": "Not Found"
}
```

## 7. General API Rules

1. Use consistent resource naming.
2. Include the API version in every versioned endpoint.
3. Use the correct HTTP method for each operation.
4. Return consistent response shapes.
5. Validate incoming request data.
6. Use appropriate HTTP status codes.
7. Keep filtering and sorting separate from pagination.
8. Apply filtering and sorting before field selection and pagination.
9. Return a `Location` header when creating a resource.
10. Ensure DELETE operations are idempotent.
11. naming plurals for collections 
