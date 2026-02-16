# Power-Pages-Universal-Global-Search-Implementation
This project demonstrates how to implement a Global Search functionality in Power Pages that:  Searches across multiple Dataverse tables  Respects Table Permissions  Uses Power Pages Web API (/_api)  Supports keyword filtering  Displays categorized results  Supports pagination (basic)  Fully client-side implementation

The solution:

- 🔎 Searches across multiple tables
- 🔐 Respects Table Permissions
- ⚡ Uses Power Pages Web API (`/_api`)
- 🧠 Implements debounced search for performance
- 🏗 Supports scalable extension
- 🛡 Follows security best practices

---

## 🏗 Architecture

User Input
   ↓
JavaScript (Client)
   ↓
Power Pages Web API (/_api)
   ↓
Dataverse
   ↓
Filtered Results (Security Applied)

## 🧱 Tables Used (Example)

| Table | Type |
|--------|--------|
| Contact | Standard |
| Opportunity | Standard |
| Care | Custom |
| Care Plan Activities | Custom |

> Replace logical names with your environment schema names.

---

## 📋 Prerequisites

- Microsoft Power Pages environment
- Dataverse tables configured
- Portal Management App access
- Web Roles created
- Table Permissions configured
- Web API enabled

---

## 🔐 Step 1 – Enable Web API

Go to:

**Portal Management → Site Settings**

Create the following Site Settings:

| Name | Value |
|------|--------|
| Webapi/Enabled | true |
| Webapi/contacts/enabled | true |
| Webapi/opportunities/enabled | true |
| Webapi/new_cares/enabled | true |
| Webapi/new_careplanactivities/enabled | true |

⚠ Replace logical names if different.

---

## 🔐 Step 2 – Configure Table Permissions

Navigate to:

**Power Pages → Security → Table Permissions**

For each table:

### Contact
- Scope: Contact
- Privilege: Read

### Care
- Scope: Parent (Contact relationship)
- Privilege: Read

### Care Plan Activities
- Scope: Parent (Care relationship)
- Privilege: Read

### Opportunity
- Scope: Parent (Contact relationship)
- Privilege: Read

Assign appropriate Web Role.

---

## 🌐 Step 3 – Create Search Page

Create a new page:

Name: Global Search
Partial URL: search

Assign the Web Template provided in this repository.

---

🧩 Step 4 – Create Web Template

Portal Management → Web Templates → New

Name: GlobalSearchTemplate

🖥 Step 5 – Add Search UI
💻 Step 6 – Implement Search Logic
🎨 Step 7 – Render Categorized Results

## 🧩 Web Template Structure

<div class="container mt-4">
  <h3>Global Search</h3>

  <div class="input-group mb-3">
    <input type="text" id="searchInput" class="form-control" placeholder="Search records...">
    <button class="btn btn-primary" onclick="debouncedSearch()">Search</button>
  </div>

  <div id="loading" style="display:none;">Searching...</div>
  <div id="searchResults"></div>
</div>
```

JavaScript includes:

- Debounce logic
- Multi-entity search
- `$select` optimization
- `$top` limiting
- Error handling
- Loading indicator

---

## ⚡ Performance Best Practices

- Always use `$select`
- Limit results using `$top`
- Avoid large memo fields
- Index searchable fields
- Use debounce (500ms+)
- Avoid returning unnecessary columns

---

⚡ Step 8 – Performance Optimization
✔ Always use $select
✔ Add pagination:

&$top=10


✔ Add sorting:

&$orderby=createdon desc


✔ Add debounce for live search

Example:

let timer;
document.getElementById("searchInput").addEventListener("keyup", function(){
  clearTimeout(timer);
  timer = setTimeout(performSearch, 500);
});

## 🔒 Security Considerations

- Results respect Table Permissions
- No direct Dataverse connection exposed
- Web API enforces portal security
- Test using restricted Web Role
- Avoid exposing sensitive columns

## 🚀 Deployment Steps

1. Copy Web Template into Portal Management
2. Create Web Page
3. Assign Web Template
4. Configure Site Settings
5. Configure Table Permissions
6. Clear Portal Cache
7. Test with restricted user

## 🛠 Troubleshooting

### 401 Unauthorized
- Check Table Permissions
- Verify Web Role assignment

### 404 Web API Error
- Verify `Webapi/[entity]/enabled` setting

### No Results Returned
- Confirm field logical names
- Verify search column contains text
- Check relationship scope
