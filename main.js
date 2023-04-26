// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Zjk5N2RlYS0zMGY2LTQxNWQtYjAwMy1iYWUyODI4ODY5YTUiLCJpZCI6MTE3OTUzLCJpYXQiOjE2NzA3Mzk4MTl9.k3I9be0G6cm7S9-U3lYsvSaUZ6mKVf0Capzojy3RZAU";

// Create a Viewer with terrain - remove widgets
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: Cesium.createWorldTerrain(),
  timeline: false,
  geocoder: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  baseLayerPicker: false,
  animation: false,
  searchButton: false,
  homeButton: false,
  infoBox: false
});

// Remove Cesium logo
viewer._cesiumWidget._creditContainer.style.display = "none";

// Import data source file
const dataSourcePromise = Cesium.CzmlDataSource.load("data.czml");
viewer.dataSources.add(dataSourcePromise);
//console.log(viewer.dataSources);

// Create a custom InfoBox
const container = document.getElementById("cesiumContainer");
const infoBox = document.createElement("div");
const topDiv = document.createElement("div");
const botDiv = document.createElement("div");
topDiv.classList.add("top-div");
botDiv.classList.add("bot-div");
infoBox.classList.add("custom-infobox");
infoBox.appendChild(topDiv);
infoBox.appendChild(botDiv);
container.appendChild(infoBox);

// Load model
(async () => {
  "use strict";
  try {
    const resource = await Cesium.IonResource.fromAssetId(1599421);
    const position = Cesium.Cartesian3.fromDegrees(174.85545, -36.890315, 59.4);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(-219.63, -0.05, -0.01));
    const entity = viewer.entities.add({
      name: "TamakiModel",
      position: position,
      orientation: orientation,
      description: "Tamaki Business Estate",
      model: {
        uri: resource,
        scale: 7.0
      },
    });

  viewer.trackedEntity = entity;
  } catch (error) {
    console.log(error);
}
  
})();

// Custom infoBox logic
viewer.selectedEntityChanged.addEventListener((selectedEntity) => {
console.log(selectedEntity)

  if (selectedEntity === undefined || selectedEntity.name === "TamakiModel") {
    // No entity is currently selected or TamakiModel entity is selected
    if (infoBox.classList.contains("open")) {
      infoBox.classList.remove("open");
      infoBox.classList.add("close");
    }
  } else if (selectedEntity instanceof Cesium.Entity) {
    // An entity has been selected
    if (infoBox.classList.contains("close")) {
      infoBox.classList.remove("close");
      infoBox.classList.add("open");
    } else if (infoBox.classList.contains("open")) {
      // Close the infoBox first before reopening it with updated information
      infoBox.classList.remove("open");
      infoBox.classList.add("close");
      setTimeout(() => {
        infoBox.classList.remove("close");
        infoBox.classList.add("open");

        // Split Description into parts
        var description = selectedEntity.description.getValue();
        var parts = description.split("<hr>");
        topDiv.innerHTML = parts[0];
        botDiv.innerHTML = parts[1];
      }, 300);
      return;
    } else {
      infoBox.classList.add("open");
    }
    var description = selectedEntity.description.getValue();
    var parts = description.split("<hr>");

    topDiv.innerHTML = parts[0];
    botDiv.innerHTML = parts[1];
  }
});

infoBox.addEventListener('click', (event) => {

  if (event.target === infoBox) {
      console.log("YES")
  }
});


/* CODE SNIPPETS
-36.89072172745562, 174.85554813871818

*/

