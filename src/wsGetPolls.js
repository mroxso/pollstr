const socket = new WebSocket('wss://relay.damus.io');

socket.onopen = function(event) {
    socket.send('["REQ", "133742069", {"kinds": [6969]}]');
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data[0] === "EVENT") {
        if(data[2].kind === 6969) {
            const id = data[2].id;
            const content = data[2].content;
            const tags = [];
            for (const tag of data[2].tags) {
                if (tag[0] === "poll_option") {
                    tags.push(tag[2]);
                }
            }
            const pubkey = data[2].pubkey;
            const pubkeyShortened = `${pubkey.slice(0, 3)}...${pubkey.slice(-3)}`;
            const createdAt = data[2].created_at;
            const date = new Date(createdAt * 1000);
            const formattedTime = date.toLocaleString();
            var divCol = document.createElement('div');
            divCol.setAttribute('class', 'col');
            var divCard = document.createElement('div');
            divCard.setAttribute('class', 'card shadow-sm');
            var divCardBody = document.createElement('div');
            divCardBody.setAttribute('class', 'card-body');
            var pCardText = document.createElement('p');
            pCardText.setAttribute('class', 'card-text');
            pCardText.innerHTML = content;
            var divBtnFlex = document.createElement('div');
            divBtnFlex.setAttribute('class', 'd-flex justify-content-between align-items-center');
            var divBtnGroup = document.createElement('div');
            divBtnGroup.setAttribute('class', 'btn-group');
            let optionCount = 0;
            for(const tag of tags) {
                divBtnGroup.innerHTML +=
                `<button type="button" class="btn btn-sm btn-outline-secondary" onclick="nostrSignEventZapRequest('${id}',${optionCount});">${tag}</button>`;
                optionCount++;
            }
            var smallText = document.createElement('small');
            smallText.setAttribute('class', 'text-body-secondary');
            smallText.innerHTML = formattedTime;

            var smallTextId = document.createElement('small');
            smallTextId.setAttribute('class', 'text-body-secondary');
            smallTextId.innerHTML = id;

            divBtnFlex.appendChild(divBtnGroup);
            divBtnFlex.appendChild(smallText);
            divCardBody.appendChild(pCardText);
            divCardBody.appendChild(divBtnFlex);
            divCardBody.appendChild(smallTextId);

            divCard.appendChild(divCardBody);
            divCol.appendChild(divCard);
            document.getElementById('polls-row').appendChild(divCol);
        }
    }
};