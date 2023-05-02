const socket = new WebSocket('wss://relay.damus.io');

socket.onopen = function(event) {
    socket.send('["REQ", "133742069", {"kinds": [6969]}]');
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data[0] === "EVENT") {
        if(data[2].kind === 6969) {
            const content = data[2].content;
            const tags = [];
            for (const tag of data[2].tags) {
                if (tag[0] === "poll_option") {
                    // console.log(tag[2]);
                    tags.push(tag[2]);
                }
            }
            // console.log(tags);
            const pubkey = data[2].pubkey;
            const pubkeyShortened = `${pubkey.slice(0, 3)}...${pubkey.slice(-3)}`;
            const createdAt = data[2].created_at;
            const date = new Date(createdAt * 1000);
            const formattedTime = date.toLocaleString();
            // TODO: Show polls
            var divCol = document.createElement('div');
            divCol.setAttribute('class', 'col');
            var divCard = document.createElement('div');
            divCard.setAttribute('class', 'card shadow-sm');
            var divCardBody = document.createElement('div');
            divCardBody.setAttribute('class', 'card-body');
            
            divCardBody.innerHTML = `
                <p class="card-text">${content}.</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        `
                        for(const tag of tags) {
                            divCardBody.innerHTML +=
                            `<button type="button" class="btn btn-sm btn-outline-secondary">${tag}</button>`;
                        }
                        `
                    </div>
                    <small class="text-body-secondary">${formattedTime}</small>
                </div>
            `;
            divCard.appendChild(divCardBody);
            divCol.appendChild(divCard);
            document.getElementById('polls-row').appendChild(divCol);
        }
    }
};