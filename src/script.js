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
            div.setAttribute('class', 'container');
            div.innerHTML = `
                <div class="parent">
                    <div class="child">${a}</div>
                    <div class="child">+</div>
                    <div class="child">${b}</div>
                    <div class="child">=</div>
                    <div class="child">${a + b}</div>
                </div>
            `;
            document.getElementById('polls-container').appendChild(div);
        }
    } else {
        // infoContainer.innerHTML = data[2].content;
    }
};