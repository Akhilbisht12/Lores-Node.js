
function copyFunction() {
    /* Get the text field */
    var copyText = document.getElementById("teamId");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied!!");
}

console.log('connected js functions')
$(function(){
    $('.likeForm').on('submit', function(e){
        e.preventDefault();
        var btn = e.target.elements.likeBtn;
            btn.style.color = 'red';
        var id = e.target.elements.id.value;
        $.ajax({
            url : `/like/${id}`,
            type : 'GET',
            contentType : 'application/json',
            success : function(res){
                console.log(res);
                
            }
        })
    })


})

$(function () {
    $('.catbutton').on('submit', function(e){
        console.log('clicked')
        e.preventDefault();
        //var cat =e.getElementById("catid").innerText

        console.log('han')
        $.ajax({
            type: 'GET',
            url: `/${cat}/`,
            success: function (data) {
             
                //console.log('somu',data)
                // use the data
            }
        })
    })
})