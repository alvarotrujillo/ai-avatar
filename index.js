import axios from "axios";
import { Leap } from "@leap-ai/sdk";

const leap = new Leap("f332fe43-6929-4edb-bf8b-11bd0d8b85f6")

// Fine-tune a model with Harry Potter Image Samples. 
// For fine-tuning tips see https://guides.tryleap.ai/guides/faqs-avatar-fine-tuning 
const trainingImages = [
"https://lh3.googleusercontent.com/w6hmpWpQQDVoNDidRU3Kvjd9FFhxb5MtoFN2XkdjqFsmuZxBpV1bqeonPgJXZ7km50Jt7FIn-SkFqrEAIpWYfvFw2QYGpFr9mulrDnU71K3QmlLkrEQLDuvT8IX11qNAkS-Na2vbfTiJL18dw7J7NImVJHoNEeFGn-er5CWP18d_ZbU4lIbhk2rVAS_1VflaObJccOmaHq_nQHHd5_n96_esVWq_jJPsbmRIJ81Dru-sZYdYMbSFwkC2CVHaQSBRjrpWEKO5PzcjSFpPIvGe4OI4zQcXIMiL3JSacGRGG1H9FRiwPJ6nECMq91LVAmaZF4exiuClToJmknNPTSZVKglLQZcQbHNUSCcpD6VbLSTAMkTHvO-BL3XjqJGnV7ukPvB60YbEO6Aug2qz6H5iaySIF_zyD5eKsUfkbFLB5ero-EY-1IlAvIlkTbll-LPYim0sPHlBf0oVQSckqCMxTEjYpT3sCQsF4ByYmKtFb9iqFT1EqfHxQnuh5IGduVMOwbC_FvzbDT7tXKUVb39a6KyWGmqTiSJVBHwu-l7uf5taDJoeeskaXJIttk6by7LUwc_N6P2MSX8G4WDQI9WgiEIVpEJSLLDE9l0GoAkO3U0lsFBt8wQDU3xUo7eAZiVurLQ3r-_bDS44PankvEwEUZ-Jy8j_TG_L0Wd27EMr2Q2av832s1LdVwmB4psywti4J-ChnMWE0I2WPLQXSkNY4ZAy2PSlpahEmvODPDnZxPhsHyqqcUj5AwGGCGpF_uuNp8srR1EG7BWHXug2pGQCBishjloSVmPsg4517CuHyGSRAOotsR0fLfE-9KoZSRO_o6CbdwXmOu1HWYlxN0M725TZEYkUupkZuELHmBNnQs_JNNSTIXcXcHgAHc4_Y0OnFA49U68In7NAAPSgab_KtJIbh-M5_XG6lwALqogzHUUm5GK0ag=w942-h942-s-no?authuser=0",
"https://lh3.googleusercontent.com/Tr4hBo9gIeI5Tu7PtEcLsmo0D1sPG4GeymgoV2F7fakDxw9W4277YhNldSCT5_HT373McWvnNW9az8zLf07lEalzON2WYvUFjbNPo1GCXD4l2Kjq0XGlAzBIdk99whGqcOFkLbla-gA7kHFAu9EekgDFAQvGSsD5PCyze7lBeirXsCJFtTGaa_lVCuRrOUj_k4ulrbC3UKXBHFeOLGv1MzdBjKGud-d-5obvFWYn0aRIVqWqO2GpJFYrJ4GnqB-Lrhd_1-Jlt0JjIvKEOvaWew3L0Ct5Ja6dspogDTZ2UcfSc6aQpIqMI2EcR0ebhxEMDK1h_m02s-SIGn4turGjBeZziuv2flpfL3Zm73Blkq1CRociIggFW5Bw21PJ_AiC1qycghIVjAgBvFJ_XVomin7uXK4XugJhGbWZ-sqSe3FRcYJcY02F-DpKkwps4217HOEp5cvg4OFHeq2R50-rGF1J6x8di3e-9qTjV8sH76ZPQfc5VSJjeQ9J7SjW9-i0zI4P857Qa3NbrInlT-DsUXq9WotJ4datEw1uIwI6J-CPPoPJmM0C_9e61kuQLfvS16YAM7vTp5l3fdiHT8kE30tp9IUCOa3IoMEgH0E2vFHsuminTMrBdR5hhcnAjBaJGSEVbJiX2ovuJYCq2-8FxCwVnsbTVhMuFa70i_WB9QApPwz7mNk1WeF9d8lHKNkxcTPqCdMM_dg6AtHko9kklWXfP2xPulGD2pSWgTXAEaRnxW_L3lY8Zz_T1DiWeqIhz04oKM0T6_R_xzMCY_CcBw0fdh6UFRn7KeNWEL2XguYX0WsU7jgYajlK94hUh95gIiwYhEZC37V-4NM7nkFRqOcpapzyEGCGhsk2Ej5lNYGWDmrQCQkT0tom4hdMQLJiXQ8KeKPadi7Qjv_N2n1tbuLcRZTqsqA_JAPfz5b10cH4sisGoQ=w886-h886-s-no?authuser=0",
"https://lh3.googleusercontent.com/a8NU8xVCDFpEzDswcRVXjrAKj8ayPia4YwlGRifenvQWdxLM1S91bhTas4RbOgvAUj_iuUhIFdVYPfhgpz-RgXkQ7ZzgU9ylsYVZ7qni-2Kh4VAy8vjV8ggvCyqlWGdYgy6rPiSSvIOFSVPdeEXwJvfw72Q7ROwGsYfQME1h7QIMxx5nn1-YNDEBDvpby1YumNjFUR9rfPOrRuFkH_gTVh2Ywld8Qph-a-o0CQOmw_3-vvXgsOFt5cyt4nd9bWpFI9ku1voFFrWdoS0n3BsiXsZZh-O09owG89rkf27rUZndOCt2BwhKFI1vum_VFYQ7mH2y3fffYqbBUiifUngIIQo2HE4gpJ3szyCUe9e53aiJDW3z6Z64WhfywIPoX756sOpq-FYXUwJzjqVVxh8CMhhQPxRy-Khu8NXRWMWiJvRF_iowKlCYHhRJCbJhwcE6aysGImHfJVDqKXlD5BezGdV80yR7M7Ilp9KLn3LwsRJS3Wp55iDLwhB8Y2VnyU68iN719o1wjO_by1WL1u7kiYf3AIYDaXlm9T8O7bBlYsQIypMA6wF7K5TSBaATNDPwuIqYuiR_n0S93PG4FKOIPiWErFJqFAB_iv8sBStVftOX7ssUGrd6RPclpgse0qpvX8OWO7yPr_yQRke1WsLTRfV83U8s5x_lo1FQnbv8ZEv-xtaMvXkQL-6DBj2UR2PrLLsH2pgB6DXs47T-LbNnoKPX2loL9NIds1YoBop9Buj9nC_zl4gds9-Eu_lHR2cTdpmUryRO6gw_aN8MwC08Ggr0Hx-r1s1M9sZvhH2sCtzZFdj1EZMECH0l9qhpS69f-U28N8UtfCP_EdieUYp5nSwXStf6iPKWUZIUD4Tkm3bziJcopcKN89pY8-fnOtO0d27ZiA42X9jE6Hw_3avCKzcl35MfqcVO06JCPMxS8IC5mccc4g=w873-h942-s-no?authuser=0"
]

// Set the image prompt. Notice how I'm using '@me' subjectKeyword to get pictures similar to the ones we upload to fine tune our model
const prompt = "8k linkedin professional profile photo of @me in a shirt with studio lighting, bokeh, corporate portrait headshot photograph best photography photo winner, meticulous detail, hyperrealistic, centered uncropped symmetrical beautiful"

// Flag to check if you have existing models trained. Setting useExistingModel to false will train a new model on each Repl run
const useExistingModel = true

let modelId = null;
let versionId = null;
let trainingStatus = null
let subjectKeyword = "@me"

if (useExistingModel) {
  console.log("Checking for existing models")
  // List all models
  const { data: modelList, error: modelListError } = await leap.fineTune.listModels();
  if (modelListError) {
    console.log("Error: ", modelListError.message)
    console.log("Please fork the code and open README.md for setup instructions")
    process.exit()
  }
  // Check for existing models, use first model created
  const existingModel = modelList[0]
  modelId = existingModel ? existingModel.id : null
  subjectKeyword = existingModel ? existingModel.subjectKeyword : "@me"

  console.log("Found Model: ", existingModel ? existingModel : null)
  // If exists, get versionId and training status
  if (modelId) {
    console.log("Checking for existing versions")
    const { data: listModelVersions, error: listModelVersionsError } = await leap.fineTune.listModelVersions({
      modelId: modelId,
    });
    // Check for existing versions, use first version created
    const existingVersion = listModelVersions[0]
    versionId = existingVersion ? existingVersion.id : null
    trainingStatus = existingVersion ? existingVersion.status : null
    console.log("Found Version: ", existingVersion)
  }
}

// If no existing model, create a custom model so we can fine tune it.
if (modelId === null) {
  console.log("Creating New Model...")
  const { data: model, error: modelError } = await leap.fineTune.createModel({
    title: "Harry Potter Sample",
    subjectKeyword: "@me",
  });

  modelId = model.id;
  subjectKeyword = model.subjectKeyword
  console.log("New Model Created: ", model)
  // We now upload the images to fine tune this model.
  const { data: imageSample, error: imageSampleError } = await leap.fineTune.uploadImageSamples({
    modelId: modelId,
    images: trainingImages,
  });
  console.log("Image Samples Uploaded: ", imageSample)
}

// If no existing version, train new version
if (versionId == null) {
  // Now it's time to fine tune the model. 
  const { data: newVersion, error: newVersionError } = await leap.fineTune.queueTrainingJob({
    modelId: modelId
  });
  // Check if hit paid API limit or missing samples
  if (newVersionError) {
    console.log("Error: ", newVersionError.message)
    process.exit()
  }
  versionId = newVersion.id;
  trainingStatus = newVersion.status

  console.log("New Training Version: ", newVersion)
  console.log("Training Status: ", trainingStatus)
}

// Notice how I'm continuously getting the status of the training job and waiting until it's finished before moving on.
while (trainingStatus != "finished") {
  const { data: checkStatus, error: checkStatusError } = await leap.fineTune.getModelVersion({
    modelId: modelId,
    versionId: versionId,
  });
  const status = checkStatus.status
  console.log("Status: ", status)

  trainingStatus = status;
  // wait for 10 seconds before re-polling status
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
console.log("Training Status: " + trainingStatus)

// Now that we have a fine-tuned version of a model, we can generate images using it. Make sure subjectKeyword, ie. '@me' is in prompt
if (!prompt.includes(subjectKeyword)) {
  console.log("Error: missing subjectKeyword " + subjectKeyword + " in prompt. Please add it and re-run.")
  process.exit()
}

console.log("Image prompt: " + prompt)
console.log("Generating image...\nThis will take around 10 seconds\n")
const { data: image, error: imageError } = await leap.generate.generateImage({
  prompt: prompt,
  modelId: modelId,
  numberOfImages: 4,
});

image.images.forEach((image) => {
  console.log("Image ready: ", image.uri);
});
