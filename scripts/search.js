<script>

async function performSearch() {

  const keyword = document.getElementById("searchInput").value;

  if(!keyword){
    alert("Please enter a search term.");
    return;
  }

  document.getElementById("searchResults").innerHTML = "Searching...";

  const encoded = encodeURIComponent(keyword);

  const queries = [
    searchContacts(encoded),
    searchCare(encoded),
    searchActivities(encoded),
    searchOpportunities(encoded)
  ];

  const results = await Promise.all(queries);

  renderResults(results);
}

async function searchContacts(keyword) {
  const url = `/_api/contacts?$select=fullname,emailaddress1
  &$filter=contains(fullname,'${keyword}')`;

  return fetch(url).then(r => r.json());
}

async function searchCare(keyword) {
  const url = `/_api/new_cares?$select=new_name,new_status
  &$filter=contains(new_name,'${keyword}')`;

  return fetch(url).then(r => r.json());
}

async function searchActivities(keyword) {
  const url = `/_api/new_careplanactivities?$select=new_name,new_duedate
  &$filter=contains(new_name,'${keyword}')`;

  return fetch(url).then(r => r.json());
}

async function searchOpportunities(keyword) {
  const url = `/_api/opportunities?$select=name,estimatedvalue
  &$filter=contains(name,'${keyword}')`;

  return fetch(url).then(r => r.json());
}

</script>
