$(document).ready(function() {
    // Fetch and display trails
    function fetchTrails() {
      $.get("http://localhost:3000/trails", function(data) {
        $("#trails-list").empty();
        data.forEach(function(trail) {
          $("#trails-list").append(`
            <li>${trail.name} - ${trail.difficulty}
              <button class="btn btn-sm btn-warning edit-btn" data-id="${trail.id}">Edit</button>
              <button class="btn btn-sm btn-danger delete-btn" data-id="${trail.id}">Delete</button>
            </li>
          `);
        });
      });
    }
    
    fetchTrails(); // Initial fetch
    
    // Add new trail
    $("#add-trail-form").submit(function(event) {
      event.preventDefault();
      const trailName = $("#trail-name").val();
      const trailDifficulty = $("#trail-difficulty").val();
      
      $.post("http://localhost:3000/trails", {
        name: trailName,
        difficulty: trailDifficulty
      }, function() {
        fetchTrails(); // Fetch again after adding
        $("#trail-name").val("");
        $("#trail-difficulty").val("");
      });
    });
    
    // Edit trail
    $(document).on("click", ".edit-btn", function() {
      const trailId = $(this).data("id");
    });
    
    // Delete trail
    $(document).on("click", ".delete-btn", function() {
      const trailId = $(this).data("id");
      $.ajax({
        url: `http://localhost:3000/trails/${trailId}`,
        type: "DELETE",
        success: function() {
          fetchTrails(); // Fetch again after deleting
        }
      });
    });
  });
  
  // Edit trail
$(document).on("click", ".edit-btn", function() {
    const trailId = $(this).data("id");
    
    // Fetch trail details for editing
    $.get(`http://localhost:3000/trails/${trailId}`, function(trail) {
      const updatedName = prompt("Enter the updated name:", trail.name);
      const updatedDifficulty = prompt("Enter the updated difficulty:", trail.difficulty);
      
      // Update the trail
      $.ajax({
        url: `http://localhost:3000/trails/${trailId}`,
        type: "PUT",
        data: {
          name: updatedName,
          difficulty: updatedDifficulty
        },
        success: function() {
          fetchTrails(); // Fetch again after updating
        }
      });
    });
  });

