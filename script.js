document.addEventListener("DOMContentLoaded", () => {
  const timeline = [];

  // ================================
  // Instruction Trials (Intro Screens)
  // ================================
  // These trials introduce the participant to the survey.
  const instructions = [
    {
      type: "html-keyboard-response",
      stimulus: `<p>Welcome to the survey!</p><p class="press-any-key">Press any key to continue.</p>`
    },
    {
      type: "html-keyboard-response",
      stimulus: `<p>You will see images and videos.</p><p>After each one, answer a few questions.</p><p class="press-any-key">Press any key to continue.</p>`
    },
    {
      type: "html-keyboard-response",
      stimulus: `<p>Get ready!</p><p class="press-any-key">Press any key to continue.</p>`,
      post_trial_gap: 500 // 500ms gap before proceeding
    }
  ];

  // ================================
  // Stimuli: Images & Videos
  // ================================
  // Each stimulus (image/video) is displayed for a set/random duration.
  // No participant response is required during stimulus presentation.
  const stimuli = [
    {
      type: "image-keyboard-response",
      stimulus: "media/img1.jpg",
      choices: jsPsych.NO_KEYS, // Prevents participant from skipping
      trial_duration: jsPsych.randomization.sampleWithoutReplacement([2000, 2500, 3000], 1)[0] // Randomized duration
    },
    {
      type: "image-keyboard-response",
      stimulus: "media/img2.jpg",
      choices: jsPsych.NO_KEYS,
      trial_duration: jsPsych.randomization.sampleWithoutReplacement([2000, 2500, 3000], 1)[0]
    },
    {
      type: "video-keyboard-response",
      stimulus: ["media/vid1.mp4"],
      response_allowed_while_playing: false, // No responses allowed while the video plays
      trial_ends_after_video: true // Trial ends only when video finishes
    }
  ];

  // ================================
  // Common Questions (5 Per Stimulus)
  // ================================
  // These questions are asked after each stimulus, in a randomized order.
  const questionVariables = [
    { prompt: "Did you find this engaging?", options: ["Yes", "No"] },
    { prompt: "Was this visually appealing?", options: ["Yes", "No"] },
    { prompt: "Would you remember this later?", options: ["Yes", "No"] },
    { prompt: "Do you find this persuasive?", options: ["Yes", "No"] },
    { prompt: "Would you share this with others?", options: ["Yes", "No"] }
  ];

  // ================================
  // Question Trial (Uses Timeline Variables)
  // ================================
  // A single question trial that will pull from randomized variables.
  const questionTrial = {
    type: "survey-multi-choice",
    questions: [{
      prompt: jsPsych.timelineVariable("prompt"), // Injects randomized question
      options: jsPsych.timelineVariable("options"),
      required: true // Ensures participant answers each question
    }],
  };

  // ================================
  // Blank Screen Between Questions
  // ================================
  // Adds a short randomized pause (500-700ms) between each question.
  const blankScreen = {
    type: "html-keyboard-response",
    stimulus: "", // Empty screen to simulate a blank pause
    choices: jsPsych.NO_KEYS, // No response needed
    trial_duration: jsPsych.randomization.sampleWithoutReplacement([500, 600, 700], 1)[0] // Randomized delay
  };

  // ================================
  // Final Instruction (Survey Completion)
  // ================================
  // Displays a thank-you message at the end.
  const finalInstructions = {
    type: "html-keyboard-response",
    stimulus: `<p>Thank you for your participation!</p><p class="press-any-key">Press any key to finish.</p>`
  };

  // ================================
  // Build Timeline with Randomized Questions
  // ================================
  // - Each stimulus is displayed first.
  // - Then, a set of 5 randomized questions is presented.
  // - A blank screen is shown between questions.
  const trials = stimuli.map(stimulus => ({
    timeline: [
      stimulus,
      {
        timeline: [questionTrial, blankScreen], // Question + blank screen sequence
        timeline_variables: jsPsych.randomization.shuffle([...questionVariables]) // Randomized question order
      }
    ]
  }));

  // ================================
  // Add Instructions, Trials, and Final Message to Timeline
  // ================================
  timeline.push(...instructions, ...trials, finalInstructions);

  // ================================
  // Initialize jsPsych and Start Experiment
  // ================================
  // Displays the experiment in sequence and shows collected data at the end.
  jsPsych.init({
    timeline,
    on_finish: () => jsPsych.data.displayData() // Shows response data for debugging
  });
});
