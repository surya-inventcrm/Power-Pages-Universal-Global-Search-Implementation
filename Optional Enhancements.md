🚀 Optional Enhancements

You can further enhance this solution with the following optional improvements to improve usability, performance, and user experience.

1️⃣ Add Result Count per Section

Display the total number of records returned for each entity section.

Example:

Accounts (12)
Contacts (5)
Cases (3)

Implementation Idea:

Use .length on the result array returned from Xrm.WebApi.retrieveMultipleRecords.

Dynamically update section headers.

document.getElementById("accountCount").innerText = accounts.entities.length;

Benefit:
✔ Better UX
✔ Immediate visibility of result volume

2️⃣ Highlight Search Keyword

Improve readability by highlighting matched keywords in results.

Implementation Idea:

Use RegEx to wrap matching text in <span> with highlight class.

function highlight(text, keyword) {
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

.highlight {
  background-color: yellow;
  font-weight: bold;
}

Benefit:
✔ Clear visibility of matched terms
✔ Professional search experience

3️⃣ Add Clickable Links to Records

Make result items clickable and open records directly in Dynamics 365.

Implementation Idea:

function openRecord(entityName, id) {
  Xrm.Navigation.openForm({
    entityName: entityName,
    entityId: id
  });
}

<a href="javascript:void(0)" onclick="openRecord('account', recordId)">
  Contoso Ltd
</a>

Benefit:
✔ Quick navigation
✔ Reduces user clicks

4️⃣ Add Paging Controls

For large datasets, implement paging controls.

Options:

Use @odata.nextLink

Implement page size (e.g., $top=10)

Add Next / Previous buttons

Xrm.WebApi.retrieveMultipleRecords("account", "?$top=10")

Enhancement UI:

<< Previous | Page 1 | Next >>

Benefit:
✔ Performance optimization
✔ Clean UI for large data

5️⃣ Add Entity Icons

Display entity-specific icons beside each section for better visual clarity.

Example:

🏢 Accounts
👤 Contacts
📄 Cases

Or use Fluent UI / SVG icons.

Benefit:
✔ Modern UI
✔ Visual differentiation

6️⃣ Add Loading Spinner

Show a spinner while Web API calls are in progress.

HTML:

<div id="spinner" class="loader"></div>

CSS:

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0078d4;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

JavaScript:

document.getElementById("spinner").style.display = "block";
// After API call
document.getElementById("spinner").style.display = "none";


Benefit:
✔ Professional feel
✔ Clear feedback to users

7️⃣ Add Advanced Filter Dropdown

Allow users to filter results dynamically.

Example UI:

[ Entity ▼ ]  [ Status ▼ ]  [ Created On ▼ ]

Implementation Idea:

Dynamically build FetchXML or OData query based on filter selections.

let query = `?$filter=statuscode eq ${selectedStatus}`;

Enhancement Ideas:

Multi-select filters

Date range filter

Status-based filtering

Benefit:
✔ Better control
✔ Enterprise-ready solution
