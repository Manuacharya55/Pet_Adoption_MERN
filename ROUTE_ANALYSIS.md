# Route Analysis Report

This document outlines the findings from a detailed audit of the API routes and controllers. It categorizes issues as Incomplete, Unimplemented, or Underdeveloped, and provides specific corrections and improvement suggestions.

## Summary of Findings

| Module | Route | Status | Issue | Severity |
| :--- | :--- | :--- | :--- | :--- |
| **User** | `POST /login` | **Underdeveloped** | Critical Security Flaw: Password is not verified. | **Critical** |
| **User** | `POST /register` | **Underdeveloped** | Missing email validation and password strength check. | High |
| **User** | `POST /wishlist/:petId` | **Underdeveloped** | Logic error: returns success but continues execution to create duplicate. | Medium |
| **User** | `DELETE /wishlist/:petId` | **Underdeveloped** | Logic error: Incorrect check for deletion success. | Low |
| **Shop** | `PATCH /:shopId` | **Incomplete** | Route is commented out in `Shop.router.js`. | Low |
| **Shop** | `GET /:shopId` | **Underdeveloped** | Returns all adoptable pets, not filtered by shop. | Medium |
| **Shop** | `POST /register` | **Underdeveloped** | Basic validation only. | Low |
| **Pets** | `GET /` | **Underdeveloped** | Pagination logic flawed (limit/skip vs count). | Low |
| **Pets** | `POST /` | **Underdeveloped** | No verification if user owns the shop. | Medium |
| **Pets** | `PATCH /:petId` | **Underdeveloped** | No verification if user owns the pet/shop. | High |
| **Pets** | `DELETE /:petId` | **Underdeveloped** | No verification if user owns the pet/shop. | High |
| **Adoption** | `PATCH /:petId` | **Unimplemented** | Approved adoption does not mark pet as adopted. | High |
| **Adoption** | `PATCH /:petId` | **Unimplemented** | `sendBulkMail` called without arguments, fails to send emails. | Medium |
| **Adoption** | `POST /` | **Underdeveloped** | Confusing variable naming in request body. | Low |
| **Address** | `PATCH /:addressId` | **Underdeveloped** | No ownership verification. | High |
| **Address** | `POST /` | **Underdeveloped** | Error handling for user update failure missing. | Low |
| **Category** | `POST /`, `PATCH /`, `DELETE /` | **Underdeveloped** | No admin role check. | **Critical** |
| **Dashboard** | `GET /admin` | **Underdeveloped** | No authentication/authorization. | **Critical** |
| **Dashboard** | `GET /shopkeeper` | **Underdeveloped** | Logic error: Swapped male/female pet counts. | Low |
| **Admin** | `GET /users`, `GET /shops`, `GET /pets` | **Underdeveloped** | No authentication/authorization. | **Critical** |

---

## Detailed Analysis & Corrections

### 1. User Module (`server/src/controllers/User.controller.js`)

#### **Route:** `POST /api/v1/auth/login`
- **Status:** Underdeveloped (Critical Security Flaw)
- **Issue:** The controller finds the user by email but **does not verify the password**. It immediately generates a token if the email exists.
- **Correction:** Compare the provided password with the stored hash using `bcrypt` (or similar, assuming `User` model has a `isPasswordCorrect` method or similar).

```javascript
// Current
const existingUser = await User.findOne({ email });
if (!existingUser) { throw new ApiError(401, "No Such User"); }
const token = await existingUser.generateToken();

// Correction
const existingUser = await User.findOne({ email });
if (!existingUser) { throw new ApiError(401, "No Such User"); }

const isPasswordValid = await existingUser.isPasswordCorrect(password); // Assuming method exists
if (!isPasswordValid) { throw new ApiError(401, "Invalid user credentials"); }

const token = await existingUser.generateToken();
```

#### **Route:** `POST /api/v1/auth/register`
- **Status:** Underdeveloped
- **Issue:** Checks for existence of fields but lacks validation for email format and password strength.
- **Improvement:** Use a library like `zod` or `express-validator` for robust input validation.

#### **Route:** `POST /api/v1/auth/wishlist/:petId`
- **Status:** Underdeveloped
- **Issue:** If `existingWishlist` is found, it sends a response but continues execution, attempting to create a duplicate entry (which might fail or create a duplicate).
- **Correction:** Add `return` statement.

```javascript
if (existingWishlist) {
  return res.status(201).json(new ApiSuccess(201, "", "Pet added to wishlist"));
}
```

#### **Route:** `DELETE /api/v1/auth/wishlist/:petId`
- **Status:** Underdeveloped
- **Issue:** `deleteOne` returns a result object (e.g., `{ acknowledged: true, deletedCount: 1 }`). The check `if (!existingWishlist)` checks if the object is falsy, which it rarely is (unless an error occurred, but `await` handles that).
- **Correction:** Check `deletedCount`.

```javascript
const result = await Wishlist.deleteOne({ user: _id, pet: petId });
if (result.deletedCount === 0) {
    throw new ApiError(404, "Pet not found in wishlist");
}
```

### 2. Shop Module (`server/src/controllers/Shop.controller.js`)

#### **Route:** `PATCH /api/v1/shop/:shopId`
- **Status:** Incomplete
- **Issue:** The route definition is commented out in `Shop.router.js`: `// router.patch("/:shopId",verifyJWT,updateAddress);`.
- **Correction:** Implement the `updateAddress` controller logic (or verify if `Shop` uses `Address` model separately) and uncomment the route.

#### **Route:** `GET /api/v1/shop/:shopId`
- **Status:** Underdeveloped
- **Issue:** Fetches all adoptable pets in the database, not just those belonging to the specific shop.
- **Correction:** Filter pets by shop ID.

```javascript
// Current
const pets = await Pet.find({ isAdopted: false }).populate("category").limit(limit).skip(skip);

// Correction
const pets = await Pet.find({ isAdopted: false, shop: shopId }).populate("category").limit(limit).skip(skip);
```

### 3. Pets Module (`server/src/controllers/Pets.Controller.js`)

#### **Route:** `PATCH /api/v1/pet/:petId` and `DELETE /api/v1/pet/:petId`
- **Status:** Underdeveloped
- **Issue:** The controller checks if the shop exists (`Shop.findOne({_id: shop, user: _id})`) but does **not** check if the pet actually belongs to that shop. A shop owner could modify/delete any pet if they know the ID.
- **Correction:** Verify pet ownership.

```javascript
// Add to updatePet and deletePet
const pet = await Pets.findOne({ _id: petId, shop: shop }); // Ensure pet belongs to shop
if (!pet) {
    throw new ApiError(404, "Pet not found or you do not have permission");
}
// Then proceed with update/delete
```

### 4. Adoption Module (`server/src/controllers/Adoption.controller.js`)

#### **Route:** `PATCH /api/v1/adoption/:petId` (Approve/Reject)
- **Status:** Unimplemented / Logic Gap
- **Issue 1:** When an adoption request is `approved`, the status of the `Pet` itself is not updated to `isAdopted: true`. The pet remains listed as available.
- **Correction:** Update the Pet model.

```javascript
if (status === "approved") {
    // ... existing approval logic ...

    // Correction: Mark pet as adopted
    await Pets.findByIdAndUpdate(petId, { isAdopted: true });
}
```

- **Issue 2:** `sendBulkMail()` is called without arguments, but `server/src/utils/SendBulkMail.js` expects `petID`.
- **Correction:** Pass `petId`.

```javascript
await sendBulkMail(petId);
```

### 5. Address Module (`server/src/controllers/Address.Controller.js`)

#### **Route:** `PATCH /api/v1/address/:addressId`
- **Status:** Underdeveloped
- **Issue:** Updates address by ID without verifying if it belongs to the authenticated user.
- **Correction:** Scope the update to the user.

```javascript
const existingAddress = await Address.findOneAndUpdate(
    { _id: addressId, user: req.user._id }, // Ensure user owns address
    { $set: { ... } },
    { new: true }
);
```

### 6. Category Module (`server/src/router/Category.router.js`)

#### **Route:** `POST /`, `PATCH /:categoryId`, `DELETE /:categoryId`
- **Status:** Underdeveloped (Security)
- **Issue:** Only `verifyJWT` is used. Any logged-in user can add, update, or delete categories.
- **Correction:** Implement and use an `isAdmin` middleware.

```javascript
// Middleware example
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') throw new ApiError(403, "Admin access required");
    next();
};

// Router
router.post("/", verifyJWT, verifyAdmin, addCategory);
```

### 7. Dashboard Module (`server/src/controllers/Dashboard.controller.js`)

#### **Route:** `GET /api/v1/dashboard/admin`
- **Status:** Underdeveloped (Critical Security)
- **Issue:** Route is **publicly accessible**. No `verifyJWT` or admin check in `Dashboard.router.js`.
- **Correction:** Add middleware.

```javascript
router.get("/admin", verifyJWT, verifyAdmin, adminDashBoard); // Need verifyAdmin logic
```

#### **Route:** `GET /api/v1/dashboard/shopkeeper`
- **Status:** Underdeveloped
- **Issue:** Male and Female pet counts are swapped in the response object.
- **Correction:** Swap the variables or the labels.

```javascript
// Correction
{
  name: "total female pets",
  count: femalePets, // Was malePets
},
{
  name: "total male pets",
  count: malePets, // Was femalePets
}
```

### 8. Admin Module (`server/src/router/Admin.router.js`)

#### **Route:** `GET /api/v1/admin/users`, `/shops`, `/pets`
- **Status:** Underdeveloped (Critical Security)
- **Issue:** Routes are **publicly accessible**. No `verifyJWT` or admin check.
- **Correction:** Add middleware.

```javascript
router.get("/users", verifyJWT, verifyAdmin, getAllUsers);
router.get("/shops", verifyJWT, verifyAdmin, getAllShops);
router.get("/pets", verifyJWT, verifyAdmin, getAllPets);
```

---

## General Improvements
1.  **Input Validation:** Use `zod` or `joi` to validate request bodies (email format, password strength, required fields) instead of manual checks in controllers.
2.  **Role-Based Access Control (RBAC):** Create a dedicated `verifyRole` middleware to handle `admin`, `shopkeeper`, and `user` permissions centrally.
3.  **Pagination Standard:** Create a utility or middleware for pagination to ensure consistent `limit`, `skip`, and `metadata` (total pages, current page) across all `getAll` endpoints.
4.  **Error Handling:** Ensure `AsyncHandler` wraps all async routes and `ApiError` is used consistently with `new` keyword.
