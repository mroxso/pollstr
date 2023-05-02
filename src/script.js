const socket = new WebSocket('wss://relay.damus.io');

socket.onopen = function(event) {
    socket.send('["REQ", "133742069", {"kinds": [6969]}]');
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // console.log(data);
    if (data[0] === "EVENT") {
        if(data[2].kind === 6969) {
            const content = data[2].content;
            const pubkey = data[2].pubkey;
            const pubkeyShortened = `${pubkey.slice(0, 3)}...${pubkey.slice(-3)}`;
            const createdAt = data[2].created_at;
            const date = new Date(createdAt * 1000);
            const formattedTime = date.toLocaleString();
            // console.log(content, pubkeyShortened, formattedTime);
            console.log(content);
            // TODO: Show polls
            var div = document.createElement('div');
            div.setAttribute('class', 'col');
            div.innerHTML = `
                <div class="card shadow-sm">
                    <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
                    <div class="card-body">
                        <p class="card-text">${content}.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Yes</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">No</button>
                            </div>
                            <small class="text-body-secondary">${formattedTime}</small>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('polls-row').appendChild(div);
        }
    } else {
        // infoContainer.innerHTML = data[2].content;
    }
};