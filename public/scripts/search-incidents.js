// const handleClick = () => {
//     console.log('search button clicked');
// }

const incidentView = (Incident) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${Incident.IncidentNumber} <strong>(search match: ${Incident.score})</strong></h5>
        <div class="card-body">
               <ul class="list-group">
               <li class="list-group-item">Resolver Name: ${Incident.Name}</li>
                <li class="list-group-item">Created Date: ${Incident.CreatedDate}</li>
                <li class="list-group-item">Subject: ${Incident.Subject}</li>
                <li class="list-group-item">Resolved Date: ${Incident.ResolvedDate}</li>
                <li class="list-group-item">First Point of Call Resolution: ${Incident.FirstCallResolution}</li>
                
          </ul>
        </div>
        <a href="#" class="btn btn-primary" onclick="handleSave('${Incident._id}')">Save</a>
      </div>
 </div>
`;


const handleClick = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    const incidentDomRef = document.querySelector('#incidentItems');
    try {


        

        const ref = await fetch(`/api/search-incidents/?search=${searchVal}`);
        const searchResults = await ref.json();
        let incidentHtml = [];
        searchResults.forEach(incident => {
            incidentHtml.push(incidentView(incident));
        });
        incidentDomRef.innerHTML = incidentHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}