function addNewPainting() {
    let name = $('#name').val();
    let weight = $('#weigh').val();
    let height = $('#height').val();
    let material=$('#material').val();
    let price=$('#price').val();
    let addNewPainting = {
        name: name,
        weight:weight,
        height:height,
        material:material,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(addNewPainting),
        url: "http://localhost:8080/painting",
        success: console.log('success')
    });
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/painting",
        success: function (paintingList) {
            let content = '    <tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Weight</td>\n' +
                '        <td>Height</td>\n' +
                '        <td>Material</td>\n' +
                '        <td>Price</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < paintingList.length; i++) {
                content += getPainting(paintingList[i]);
            }
            document.getElementById('paintingList').innerHTML = content;
        }
    });
}
function getPainting(painting) {
    return `<tr><td >${painting.name}</td><td >${painting.weight}</td><td >${painting.height}</td><td > ${painting.material}</td><td >${painting.price}</td>` +
        `<td><button class="deleteSmartphone" onclick="deleteRecord(${painting.id})">Delete</button></td></tr>`;
}
function deleteRecord(id) {
    $.ajax({
        url: `http://localhost:8080/painting/${id}` ,
        type: "DELETE",
        success: function(response) {
            alert("Da xoa xong");
        },
        error: function(xhr, status, error) {
            alert("Error deleting record: " + error);
        }
    })
}