$(document).ready(function () {
  $.getJSON("js/data.json", function (data) {
    console.log("data.json", data);
    var characterData = "";
    $.each(data, function (key, value) {
      characterData += "<tr>";
      characterData += "<td>" + value.name + "</td>";
      characterData += "<td>" + value.actor + "</td>";
      characterData += "<td>" + value.realname + "</td>";
      characterData += "<td>" + value.species + "</td>";
      characterData += "<td>" + value.publisher + "</td>";
      characterData += "<td>" + value.daterelease + "</td>";
      characterData + "<tr>";
    });

    $("#tableBody").append(characterData);
    var amObject = data.filter((item) => /^[a-m]/i.test(item["name"]));
    var nzObject = data.filter((item) => /^[n-z]/i.test(item["name"]));
    $("#countAM").text(Object.keys(amObject).length);
    $("#countNZ").text(Object.keys(nzObject).length);

    function sortTable() {
      var rows = $("#characterTable tbody  tr").get();

      rows.sort(function (a, b) {
        var A = $(a).children("td").eq(0).text().toUpperCase();
        var B = $(b).children("td").eq(0).text().toUpperCase();

        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      });

      $.each(rows, function (index, row) {
        $("#characterTable").children("tbody").append(row);
      });
    }
    sortTable();
  });

  $("#searchMatched").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    
  });

  $(".btn").on("click", function () {
    var filterValue = $(this).attr("id");

    $.getJSON("js/data.json", function (data) {
      if (filterValue == "AM") {
        var sortedData = data.filter((item) => /^[a-m]/i.test(item["name"]));
      } else if (filterValue == "NZ") {
        var sortedData = data.filter((item) => /^[n-z]/i.test(item["name"]));
      }

      var characterData = "";
      $.each(sortedData, function (key, value) {
        characterData += "<tr>";
        characterData += "<td>" + value.name + "</td>";
        characterData += "<td>" + value.actor + "</td>";
        characterData += "<td>" + value.realname + "</td>";
        characterData += "<td>" + value.species + "</td>";
        characterData += "<td>" + value.publisher + "</td>";
        characterData += "<td>" + value.daterelease + "</td>";
        characterData + "<tr>";
      });

      $("#tableBody").empty().append(characterData);
    });
  });
});
