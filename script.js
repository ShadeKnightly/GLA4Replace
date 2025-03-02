/*
 * @Author: Heather-may Rebecca Howse
 * @StudentID: 465473
 * @Date: Feb 27 2024
 * @Description: GLA 4
 */

// Start
$(function() {
    // Data
    const dataJson = [
        {"name":"Siobhan Keesling","grade":6,"likes":{"animal":"Dogs","fruit":"Pears","color":"Red"}},
        {"name":"Stevie Fonte","grade":1,"likes":{"animal":"Cats","fruit":"Apples","color":"Red"}},
        {"name":"Janita Ricca","grade":10,"likes":{"animal":"Rabbits","fruit":"Mangos","color":"Red"}},
        {"name":"Yadira Geno","grade":10,"likes":{"animal":"Dogs","fruit":"Bananas","color":"Red"}},
        {"name":"Scotty Penland","grade":1,"likes":{"animal":"Horses","fruit":"Apples","color":"Blue"}},
        {"name":"Latricia Glassford","grade":6,"likes":{"animal":"Horses","fruit":"Pears","color":"Blue"}},
        {"name":"Merrilee Bettencourt","grade":4,"likes":{"animal":"Rabbits","fruit":"Pears","color":"Blue"}},
        {"name":"Leigha Ezzell","grade":8,"likes":{"animal":"Dogs","fruit":"Bananas","color":"Blue"}},
        {"name":"Rosana Embry","grade":12,"likes":{"animal":"Cats","fruit":"Mangos","color":"Green"}},
        {"name":"Carmine Altschuler","grade":2,"likes":{"animal":"Cats","fruit":"Apples","color":"Green"}},
        {"name":"Holli Mogensen","grade":3,"likes":{"animal":"Horses","fruit":"Orange","color":"Green"}},
        {"name":"Reynalda Isreal","grade":7,"likes":{"animal":"Dogs","fruit":"Pears","color":"Green"}},
        {"name":"Nathanael Berends","grade":12,"likes":{"animal":"Cats","fruit":"Mangos","color":"Green"}},
        {"name":"Angelyn Kapoor","grade":8,"likes":{"animal":"Dogs","fruit":"Bananas","color":"Teal"}},
        {"name":"Laverne Charrier","grade":3,"likes":{"animal":"Rabbits","fruit":"Orange","color":"Teal"}},
        {"name":"Lizzie Cran","grade":10,"likes":{"animal":"Horses","fruit":"Mangos","color":"Teal"}},
        {"name":"Latonya Burroughs","grade":4,"likes":{"animal":"Dogs","fruit":"Orange","color":"Pink"}},
        {"name":"Hugh Whiteford","grade":8,"likes":{"animal":"Rabbits","fruit":"Bananas","color":"Pink"}},
        {"name":"Stephaine Osei","grade":4,"likes":{"animal":"Horses","fruit":"Orange","color":"Pink"}},
        {"name":"Nery Poyer","grade":3,"likes":{"animal":"Dogs","fruit":"Apples","color":"Pink"}}
    ];

    const originalData = [...dataJson];
    let dataJsonCopy = [...originalData];

    // Build body
    $("body").append(
        $("<div id='studentContainer'></div>")
    );

    //add html elements to container
    $("#studentContainer").append(
        $("<h1>Student Data Website</h1>"),
        $("<div id='wordCloudDiv'></div>"),
        $("<h2>This is a Student Data Table</h2>"),
        $("<table id='studentDataTable'></table>"),
        $("<h2>Add New Student</h2>"),
        $("<div id='studentFormContainer'></div>")
    );

     // Build form
    $("#studentFormContainer").append(
        $("<form id='studentForm'></form>")
    );

        
function renderForm() {
    $("#studentForm").append(
        $('<input type="text" placeholder="Name" id="name" required>'),
        $('<input type="number" placeholder="Grade" id="grade" min="0" max="100" required>'),
        $('<input type="text" placeholder="Favorite Animal" id="animal">'),
        $('<input type="text" placeholder="Favorite Fruit" id="fruit">'),
        $('<input type="text" placeholder="Favorite Color" id="color">'),
        $('<button type="button" id="submit">Submit</button>'),
        $('<button type="button" id="reset">Reset</button>')
    );
}
        renderForm ();


        function renderTable() {
            let tbody = $('<tbody>');
            dataJson.forEach(student => {
                const row = $('<tr>').append(
                    $('<td>').text(student.name),
                    $('<td>').html('<strong>' + student.grade + '</strong>'),
                    $('<td>').html('<u>' + student.likes.animal + '</u>'),
                    $('<td>').text(student.likes.fruit),
                    $('<td>').html('<span style="color:' + student.likes.color.toLowerCase() + ';">' + student.likes.color + '</span>')
                ).attr('data-name', student.name);
                tbody.append(row);
            });
            $("#studentDataTable").empty().append('<thead><tr><th>Name</th><th>Grade</th><th>Favorite Animal</th><th>Favorite Fruit</th><th>Favorite Color</th></tr></thead>', tbody);
        }
        renderTable();

        //https://docs.anychart.com/Basic_Charts/Tag_Cloud#general_settings
        function renderWordCloud() {
            $("#wordCloudDiv").empty();
            dataJson.forEach((student, index) => {
                const nameSpan = $('<span>').text(student.name + ' ').css({
                    'font-size': Math.floor(Math.random() * 20 + 10) + 'px',
                    'margin': '5px',
                    'display': 'inline-block',
                    'cursor': 'pointer',
                    'opacity': 0 // for fadeIn effect
                }).attr('data-name', student.name);

                nameSpan.on("click", function () {
                    $('tr[data-name="' + student.name + '"]').toggle();
                });

                $("#wordCloudDiv").append(nameSpan);

                 // Fade in each name span with a delay
                nameSpan.delay(index * 150).fadeTo(500, 1); // Delay each name's fadeIn by 150ms, duration 500ms
                });
            }
            alert("Click on a name in the Word Cloud to see what happens");
        renderWordCloud();

            
        let newStudent = {}; // Declare newStudent outside

        $("#submit").on("click", function() {
            // Assign values to newStudent
            newStudent = {
                name: $('#name').val(),
                grade: Number($('#grade').val()), // Ensure grade is a number
                likes: {
                    animal: $('#animal').val(),
                    fruit: $('#fruit').val(),
                    color: $('#color').val()
                }
            };

            // Validate input
            if (!newStudent.name || !newStudent.grade || isNaN(newStudent.grade) || newStudent.grade < 0 || newStudent.grade > 100 ||
            !newStudent.likes.animal || !newStudent.likes.fruit || !newStudent.likes.color) {
            alert("Please check your entries for accuracy");
            return;
            }

            // Add new student into to dataJson array
            dataJson.push(newStudent);
            renderTable();
            renderWordCloud();
            alert("New student added!");

                // Use manual clearing
            $('#name, #grade, #animal, #fruit, #color').val('');
        });


        // reset
        $('#reset').on("click", function() {
            dataJson.length = 0;  // Clear the array
            dataJson.push(...originalData); // Restore original data
            renderTable(); // Re-render table
            renderWordCloud(); // Re-render word cloud
            $("#studentForm input").val("");  // Clear input fields
        
        // reset, manual clear
        if ($("#studentForm").length > 0) {
            $("#studentForm").trigger("reset");
            console.log("Form reset triggered.");
        } else {
            console.log("Form not found, manually clearing inputs.");
            $('#name, #grade, #animal, #fruit, #color').val('');
        }
    });
});