
var aoi = sg_adm
Map.addLayer(aoi, {}, 'AOI - Singapore');
Map.centerObject(aoi, 11);

// Section 0 ///////////////////////////////////////////////////////////////////
// Get the collection of air pollutants from Sentinel 5 dataset

// Cloud contaminate the measurements of air pollutant concentrations. 
// Define function to exclude cloudy pixels.
function maskClouds(image){
   // Get the cloud fraction band of the image.
   var cf=image.select('cloud_fraction');
   // Create a mask using 0.3 threshold.
   var mask=cf.lte(0.3); // mask out pixels with a cloud fraction above 0.3 (i.e., 30% cloud cover)
   // Return a masked image.
   return image.updateMask(mask).copyProperties(image);
}

// air pollution collection

//Atmospheric sulfur dioxide (SO2) concentrations
var collection_so2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_SO2')
  // Filter for images intersecting our area of interest.
  .filterBounds(aoi)
  // Map the cloud masking function over the image collection.
  .map(maskClouds)
  .select('SO2_column_number_density')
 

//Atmospheric nitrogen dioxide (NO2) concentrations
var collection_no2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  // Filter for images intersecting our area of interest.
  .filterBounds(aoi)
  // Map the cloud masking function over the image collection.
  .map(maskClouds)
  .select('tropospheric_NO2_column_number_density');

//Atmospheric carbon monoxide (CO) concentration
var collection_co = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
  // Filter for images intersecting our area of interest.
  .filterBounds(aoi)
  .select('CO_column_number_density');
