/* HCI Ilias test data — transcribed from Ilias_Tests/Test1..4.pdf (questions)
   and the solution slides / answer notes in the matching .txt files.

   Question types:
     single  – one correct option (radio)
     multi   – several correct options (checkbox)
     match   – assign a value to each left-hand item (dropdown)
     text    – one or more free-text blanks
     number  – numeric answer, accepted within a range
*/

const TESTS = [
{
  id: "t1",
  title: "Test 1 — Human Information Processing",
  subtitle: "Attention, vigilance, memory, signal detection theory",
  questions: [
    {
      id: "t1q1", type: "single", title: "Selective and Focused Attention",
      prompt: "What is the difference between errors of selective and focused attention?",
      promptDe: "Was ist der Unterschied zwischen Fehlern der selektiven und der fokussierten Aufmerksamkeit?",
      options: [
        { t: "Selective errors concern only hearing; focused errors concern only vision." },
        { t: "Selective errors are based on intentionally choosing the wrong source; focused errors are based on unintentional external influences.", c: true },
        { t: "Focused attention is unlimited; selective attention is not." },
        { t: "There is no difference; the terms are synonymous." }
      ]
    },
    {
      id: "t1q2", type: "text", title: "Attention Graphic",
      prompt: "What type of attention should be assigned to the numbered boxes?",
      promptDe: "Welche Form von Attention ist den numerierten Boxen zuzuordnen?",
      image: "img/t1_q2_attention.png",
      note: "Write the full term — the word “attention” must be part of the answer, otherwise no points.",
      blanks: [
        { label: "1)", accept: ["selective attention", "selektive aufmerksamkeit"], show: "Selective attention" },
        { label: "2)", accept: ["focused attention", "fokussierte aufmerksamkeit"], show: "Focused attention" },
        { label: "3)", accept: ["divided attention", "geteilte aufmerksamkeit"], show: "Divided attention" },
        { label: "4)", accept: ["divided attention", "geteilte aufmerksamkeit"], show: "Divided attention" }
      ],
      explain: "1) You have to jump to the source because of the info “6 digits”. 2) When the reply appears it is attracting, so you jump to it. 3) + 4) So much information that you have to jump between the top (“1”, “2”) and the according fields."
    },
    {
      id: "t1q3", type: "single", title: "Vigilance Paradigm",
      prompt: "An employee in a power plant monitors a display for critical alarms that may occur at any time. Which paradigm is this?",
      promptDe: "Ein Mitarbeiter in einem Kraftwerk überwacht einen Monitor auf kritische Alarme, die zu jedem beliebigen Zeitpunkt auftreten können. Welches Paradigma liegt vor?",
      options: [
        { t: "Free-response paradigm", c: true },
        { t: "Successive vigilance paradigm" },
        { t: "Inspection paradigm" },
        { t: "Simultaneous vigilance paradigm" }
      ]
    },
    {
      id: "t1q4", type: "multi", title: "Memory and Aging",
      prompt: "Which three age-related claims about memory are shown in the memory-and-aging slide?",
      promptDe: "Welche drei altersbezogenen Aussagen zum Gedächtnis zeigt die Memory-and-Aging-Folie?",
      note: "Choose a maximum of 3 of the 6 answers.",
      maxSelect: 3,
      options: [
        { t: "Procedural memory stays the same with age, apart from physical condition.", c: true },
        { t: "Episodic memory improves strongly with age." },
        { t: "Working memory becomes unlimited with age." },
        { t: "Episodic / autobiographic memory decreases with age.", c: true },
        { t: "Semantic memory decreases in all cases." },
        { t: "Semantic memory stays with age or improves.", c: true }
      ]
    },
    {
      id: "t1q5", type: "single", title: "Confusion Matrix",
      prompt: "In the SDT confusion matrix, what is the case called when a signal was present but the observer does not detect it and says 'no'?",
      promptDe: "In der Confusion Matrix der SDT: Wie nennt man den Fall, wenn ein Signal vorhanden war, der Beobachter es aber nicht erkennt („Nein“ sagt)?",
      options: [
        { t: "Miss (false negative)", c: true },
        { t: "False alarm (false positive)" },
        { t: "Correct rejection (true negative)" },
        { t: "Hit (true positive)" }
      ]
    },
    {
      id: "t1q6", type: "single", title: "Confusion Matrix — Precision",
      prompt: "How is the metric precision defined?",
      promptDe: "Wie ist die Metrik „Precision“ definiert?",
      options: [
        { t: "(TP + TN) / total" },
        { t: "TP / (TP + FP)", c: true },
        { t: "TP / (TP + FN)" },
        { t: "TN / (TN + FP)" }
      ]
    },
    {
      id: "t1q7", type: "number", title: "CMN — Working Memory",
      prompt: "According to the Card/Moran/Newell (CMN) model, how long can working memory retain 3 chunks? Enter a number in seconds; the answer must fall within the range of CMN values.",
      promptDe: "Wie lange kann sich das Working Memory nach dem Card/Moran/Newell (CMN) Modell 3 Junks behalten? Gib eine Zahl in Sekunden an, die Antwort darf innerhalb des Rahmens der CMN Zahlen sein.",
      unit: "seconds",
      answer: { min: 5, max: 34, show: "7 — anything between 5 and 34 was accepted, depending on the slide and whether you refer to the min or max value." }
    },
    {
      id: "t1q8", type: "single", title: "Limits of Accuracy",
      prompt: "In which situation is the metric accuracy often misleading?",
      promptDe: "In welcher Situation ist die Metrik „Accuracy“ (Gesamtgenauigkeit) oft irreführend?",
      options: [
        { t: "When signal and noise are very far apart." },
        { t: "For very rare events, for example a signal rate of 0.1 %.", c: true },
        { t: "When the observer has a neutral bias." },
        { t: "When expert systems are used." }
      ]
    },
    {
      id: "t1q9", type: "match", title: "Recognition and Recall",
      prompt: "For the highlighted boxes, indicate which ones represent a recognition process and which ones represent a recall process.",
      promptDe: "Geben Sie für die markierten Boxen an, wo ein Recognition und wo ein Recall Prozess vorliegt.",
      image: "img/t1_q9_recall.png",
      pairs: [
        { l: "1) Microphone icon in the header", r: "Recognition" },
        { l: "2) “Enter the 6-digit code to confirm your identity.”", r: "Recognition" },
        { l: "3) “123 456” typed by the user", r: "Recall" },
        { l: "4) The e-mail address field", r: "Recall" }
      ],
      explain: "1) Recognizing the icon. 2) Recognizing the field (can be misunderstood as recalling the number, but…). 3) Here you have to recall the number — should be clear from the context. 4) Recall of the e-mail: seeing “enter email” gives you no “meaning”, you have to search for your e-mail."
    }
  ]
},
{
  id: "t2",
  title: "Test 2 — Perception",
  subtitle: "Vision, depth cues, colour, hearing, Gestalt laws",
  questions: [
    {
      id: "t2q1", type: "multi", title: "Fovea, Retina & Colour Perception",
      prompt: "Which statements are correct?",
      options: [
        { t: "In the outermost periphery, colour perception is best." },
        { t: "Cones are located predominantly in the central retina and are important for colour vision.", c: true },
        { t: "The highest visual resolution is located in the fovea.", c: true },
        { t: "Rods are mainly responsible for colour perception." },
        { t: "The fovea is identical to the blind spot." },
        { t: "In the very central area, there are no blue colour receptors.", c: true }
      ]
    },
    {
      id: "t2q2", type: "multi", title: "Primary Depth Cues",
      prompt: "Which statements are correct?",
      options: [
        { t: "Retinal disparity arises because the two eyes receive slightly different images.", c: true },
        { t: "Stereopsis combines the different images from both eyes into a three-dimensional experience.", c: true },
        { t: "Motion parallax is a primary depth cue." },
        { t: "Texture gradient is a primary depth cue." },
        { t: "Accommodation is a secondary depth cue." },
        { t: "Convergence is a colour model." }
      ]
    },
    {
      id: "t2q3", type: "multi", title: "Additive & Subtractive Colour",
      prompt: "Which statements are correct?",
      options: [
        { t: "Additive colour mixing concerns light sources, for example displays.", c: true },
        { t: "Subtractive colour mixing concerns printed colours on materials, where parts of the light are reflected or absorbed.", c: true },
        { t: "According to the slides, subtractive colours are generally glossier than additive colours." },
        { t: "Additive colour information should never be embedded in a bright environment." },
        { t: "Additive colour mixing is typical for printing on paper." },
        { t: "Subtractive colour arises through differences in decibels." }
      ]
    },
    {
      id: "t2q4", type: "multi", title: "Auditory Perception",
      prompt: "Which statements are correct?",
      options: [
        { t: "Transduction translates sound vibrations into neural impulses.", c: true },
        { t: "Auditory grouping includes segregation into streams and integration into coherent streams.", c: true },
        { t: "Scene analysis and interpretation belong to the four stages of auditory perception.", c: true },
        { t: "Auditory grouping is based exclusively on colour." },
        { t: "In auditory perception, the first two processes of auditory grouping cannot ignore sound." },
        { t: "MP3 is explained in the chapter as an example of visual compression." }
      ]
    },
    {
      id: "t2q5", type: "match", title: "Visual Perception Areas",
      prompt: "Assign each statement to the corresponding term.",
      pairs: [
        { l: "Detail and sharpness perception are best in this area", r: "Foveal perception" },
        { l: "People react particularly sensitively to movement outside the main focus", r: "Peripheral perception" },
        { l: "Stimuli outside the focus can be ignored despite the sensitivity to them", r: "Tunnel effect" },
        { l: "Missing information is supplemented based on experience and previous images", r: "Cognitive reconstruction" }
      ]
    },
    {
      id: "t2q6", type: "match", title: "Depth in 2D Interfaces",
      prompt: "Assign each interface design decision to the corresponding depth cue.",
      pairs: [
        { l: "One window overlaps another window", r: "Overlap" },
        { l: "An object with a shadow appears three-dimensional", r: "Light and shade" },
        { l: "Similar objects are displayed in smaller sizes", r: "Relative size" },
        { l: "The background pattern becomes denser towards the back", r: "Texture gradient" }
      ]
    },
    {
      id: "t2q7", type: "match", title: "Vision & Hearing in Interfaces",
      prompt: "Match each statement to the corresponding modality advantage.",
      pairs: [
        { l: "Can indicate where the eyes should look", r: "Audio" },
        { l: "Information often remains visibly available", r: "Vision" },
        { l: "Can be perceived faster than visual cues", r: "Audio" },
        { l: "Can originate from outside the field of view", r: "Audio" }
      ]
    },
    {
      id: "t2q8", type: "single", title: "Continuity & Common Fate",
      prompt: "A drop-down menu opens smoothly along a shared direction of movement. Which principles are at work?",
      options: [
        { t: "Continuity and Common Fate", c: true },
        { t: "Subtractive colour and presbyopia" },
        { t: "Area principle and decibel" },
        { t: "Hue and chroma" }
      ]
    },
    {
      id: "t2q9", type: "match", title: "Gestalt Laws",
      prompt: "Match each of the two highlighted areas in the figure with the most appropriate Gestalt principle.",
      image: "img/t2_q9_gestalt.png",
      pairs: [
        { l: "Area 1 — the green box around the whole first search result", r: "Proximity" },
        { l: "Area 2 — the blue dashes marking the repeated title styling", r: "Similarity" }
      ],
      distractors: ["Closure", "Continuity", "Common fate", "Figure and ground", "Symmetry"]
    }
  ]
},
{
  id: "t3",
  title: "Test 3 — Design & Analysis",
  subtitle: "Activities, scenarios, affordances, Fitts, GOMS, KLM",
  questions: [
    {
      id: "t3q1", type: "match", title: "Activities and Technologies",
      prompt: "Match each statement about activities and technologies to its design implication.",
      pairs: [
        { l: "Activities establish requirements for technologies", r: "Start from what must be supported" },
        { l: "Contexts establish requirements", r: "Account for where and under which conditions use happens" },
        { l: "Technologies offer new ways to undertake activities", r: "Consider opportunities, not only constraints" },
        { l: "Design within a sphere of activity", r: "Fit solutions to a domain of practice" },
        { l: "Technology changes people's activities", r: "Expect feedback effects after introducing a system" }
      ]
    },
    {
      id: "t3q2", type: "multi", title: "Artifacts in Fieldwork",
      prompt: "During fieldwork, the team photographs forms and follows a document from empty form to final processing. Which two slide principles apply?",
      options: [
        { t: "Artifacts provide additional insight into the task.", c: true },
        { t: "Artifacts should be ignored if interviews were already done." },
        { t: "Only final outputs matter." },
        { t: "All artifacts must be removed from the workplace." },
        { t: "Tracing a work product through use can be helpful.", c: true }
      ]
    },
    {
      id: "t3q3", type: "multi", title: "Activity Characteristics",
      prompt: "For a medical alarm interface, which two activity characteristics are especially relevant?",
      options: [
        { t: "Temporal aspects such as timing and frequency.", c: true },
        { t: "Corporate brand colour." },
        { t: "Safety criticality: what happens if something goes wrong.", c: true },
        { t: "Database normalization form." },
        { t: "Investor presentation style." }
      ]
    },
    {
      id: "t3q4", type: "single", title: "Conceptual Scenario",
      prompt: "The coffee-machine scenario says: put cup under the machine, select options, start preparation, wait, remove full cup. Why is this a conceptual scenario rather than a detailed UI specification?",
      options: [
        { t: "It describes user activity without committing to buttons, menus, screens, or sensors.", c: true },
        { t: "It specifies all device-internal algorithms." },
        { t: "It requires a final physical prototype." },
        { t: "It contains complete exception handling for all failures." }
      ]
    },
    {
      id: "t3q5", type: "single", title: "Combining User Stories",
      prompt: "Several user stories about commuters buying different ticket types are combined into a technology-independent description of buying a ticket before travel. What artifact is this most likely to be?",
      options: [
        { t: "A conceptual scenario.", c: true },
        { t: "A high-fidelity prototype." },
        { t: "A final physical model." },
        { t: "A detailed implementation script." }
      ]
    },
    {
      id: "t3q6", type: "single", title: "Type of Scenario",
      prompt: "A scenario says: “Maria taps the blue checkout button, scans a QR code, and receives a printed receipt.” What type of scenario is this?",
      options: [
        { t: "User story, because it only captures anecdotes." },
        { t: "Conceptual scenario, because it avoids interface decisions." },
        { t: "Concrete scenario, because it suggests particular UI elements and function allocation.", c: true },
        { t: "Requirement template, because it states project constraints." },
        { t: "MoSCoW prioritization, because it ranks features." }
      ]
    },
    {
      id: "t3q7", type: "match", title: "Ticket-Machine Analysis Prompts",
      prompt: "Match each ticket-machine analysis prompt to the design concern it exposes.",
      pairs: [
        { l: "Regular or infrequent?", r: "Frequency of use and learnability burden" },
        { l: "Peaks and troughs?", r: "Queueing, throughput, and capacity" },
        { l: "Interruptible?", r: "Need for state recovery and clear progress" },
        { l: "Safety critical?", r: "Consequences of errors or failures" },
        { l: "Mental model to engender?", r: "How people should understand the machine and task" }
      ]
    },
    {
      id: "t3q8", type: "match", title: "Affordances",
      prompt: "Match each affordance-related concept with its role in building a mental concept of a system.",
      pairs: [
        { l: "Interpreting symbols and components", r: "Necessary to infer how the system can be used" },
        { l: "Functionality of the device vs. desired action", r: "Match between what is possible and what the user wants" },
        { l: "Semantic distance", r: "Gap between user intention and system meaning" },
        { l: "Articulatory distance", r: "Gap between intended action and physical expression" },
        { l: "Norman adopting Gibson's concept", r: "Affordance becomes central for perceived use" }
      ]
    },
    {
      id: "t3q9", type: "match", title: "Design-Analysis Techniques",
      prompt: "Match each design-analysis purpose with the most suitable type of technique from this chapter.",
      pairs: [
        { l: "Estimate how long a pointing action will take", r: "Fitts' Law / physical model" },
        { l: "Explain why users misinterpret a system state", r: "Mental models and mapping" },
        { l: "Find where a user cannot discover the next possible action", r: "EEAC Gulf of Execution" },
        { l: "Represent ordered work steps and alternatives", r: "HTA (Hierarchical Task Analysis)" },
        { l: "Compute expert execution time from low-level actions", r: "KLM (Keystroke-Level Model)" }
      ]
    },
    {
      id: "t3q10", type: "single", title: "Hick's and Fitts' Law",
      prompt: "A search interface combines query suggestions with clickable result items. Which interpretation best reflects the slide's message?",
      options: [
        { t: "Only the Power Law of Practice can be applied, because lists are never decisions." },
        { t: "The design may involve both decision complexity and pointing effort, so Hick's and Fitts' laws can be considered together.", c: true },
        { t: "Selection in long lists is purely aesthetic." },
        { t: "Hick's law eliminates all pointing costs." }
      ]
    },
    {
      id: "t3q11", type: "single", title: "Constraints",
      prompt: "A flight-booking form prevents selecting a return date before the departure date. Which design principle is most directly applied?",
      options: [
        { t: "A constraint guides the user and minimizes invalid choices.", c: true },
        { t: "Hick's law is violated because the number of choices increases." },
        { t: "The system creates an intentionally inconsistent mapping." },
        { t: "KLM predicts that all users will make errors." },
        { t: "The affordance is removed because no visible property remains." }
      ]
    },
    {
      id: "t3q12", type: "single", title: "GOMS Selection Rules",
      prompt: "In the GOMS example for closing a window, the user does not have access to a mouse. Which method should the selection rule predict?",
      options: [
        { t: "Use the keyboard shortcut ALT+F4.", c: true },
        { t: "Use the close button because it is always default even without mouse." },
        { t: "Use the context menu because it has the longest method." },
        { t: "Perform no action because GOMS cannot model selections." },
        { t: "Use Hick's law to remove the window." }
      ]
    },
    {
      id: "t3q13", type: "multi", title: "GOMS Concepts",
      prompt: "A GOMS description offers a shortcut method and a menu method for the same goal. Which two concepts explain this representation?",
      options: [
        { t: "Methods are sequences of operators or subgoals for accomplishing a goal.", c: true },
        { t: "Selection rules predict which method is used based on context.", c: true },
        { t: "Goals are low-level keypresses only." },
        { t: "Operators are always complete user intentions rather than actions." },
        { t: "GOMS excludes cognitive and perceptual operators." }
      ]
    },
    {
      id: "t3q14", type: "single", title: "ATM — Card Before Cash",
      prompt: "Why does an ATM that returns the card before the cash better protect users from forgetting the card?",
      options: [
        { t: "It reduces the visual size of the cash slot." },
        { t: "It increases decision entropy intentionally." },
        { t: "It makes card collection a hidden optional action after goal completion." },
        { t: "The overall goal is not yet achieved before the card is collected, so the user remains engaged.", c: true },
        { t: "It removes all need for feedback." }
      ]
    }
  ]
},
{
  id: "t4",
  title: "Test 4 — Observation & Evaluation",
  subtitle: "Questionnaires, ESM, ethnography, workload, sampling, validity",
  questions: [
    {
      id: "t4q1", type: "multi", title: "Questionnaire Best Practices",
      prompt: "Which of the following are considered “best practices” or guidelines for the design of a usability questionnaire? (Select all that apply)",
      options: [
        { t: "Avoid jargon and language that the interviewee may not understand.", c: true },
        { t: "Use very long questionnaires to ensure every possible detail is covered." },
        { t: "Provide clear instructions on how to complete the questionnaire.", c: true },
        { t: "Split compound sentences into two separate questions.", c: true },
        { t: "Give the option for “free” comments at the end.", c: true }
      ]
    },
    {
      id: "t4q2", type: "single", title: "ESM",
      prompt: "What is a central advantage of ESM compared with a single retrospective questionnaire?",
      options: [
        { t: "It captures experience closer to the situation.", c: true },
        { t: "It eliminates participant burden completely." },
        { t: "It requires no questions." },
        { t: "It only works in laboratory studies." },
        { t: "It prevents event-based sampling." }
      ]
    },
    {
      id: "t4q3", type: "match", title: "Ethnography",
      prompt: "Match the ethnographic element to its meaning.",
      pairs: [
        { l: "Participant observation", r: "Researcher observes while engaging with context" },
        { l: "Interviews", r: "Method for eliciting participant perspectives" },
        { l: "Immersion in culture", r: "Experiencing participant and context from within" },
        { l: "Comments, incidents, artifacts", r: "Materials collected for analysis" }
      ]
    },
    {
      id: "t4q4", type: "multi", title: "Experience Studies",
      prompt: "What are the characteristics or goals of “Experience Studies” within Ubicomp field studies? (Select all that apply)",
      options: [
        { t: "Understanding how technology use changes people's behavior over a long period.", c: true },
        { t: "Verifying if a new technology functions technically in the real world." },
        { t: "Using the Experience Sampling Method (ESM) to collect data throughout the day.", c: true },
        { t: "Conducting a short, 15-minute controlled lab session." }
      ]
    },
    {
      id: "t4q5", type: "multi", title: "Expert Inspection",
      prompt: "In expert inspections without users, which problems are highlighted as major risks? (Select all that apply)",
      options: [
        { t: "Important problems may be missed.", c: true },
        { t: "Many trivial problems are often identified.", c: true },
        { t: "Expert biases can distort problem prioritization.", c: true },
        { t: "Detailed user journey documentation is required." },
        { t: "Findings cannot be replicated by other experts." }
      ],
      explain: "Heads-up: the solution slide in Test4.pdf marks “Expert biases can distort problem prioritization” as correct, while your notes in Test4_Observation.txt marked it as false. The slide is used here."
    },
    {
      id: "t4q6", type: "match", title: "Human Memory",
      prompt: "Match the evaluation method to the primary type of human memory it accesses, based on the lecture's memory model.",
      pairs: [
        { l: "Think Aloud Protocol", r: "Working Memory" },
        { l: "Interviews asking for recall of a past situation", r: "Episodic Memory" },
        { l: "Questionnaires asking for general facts", r: "Semantic Memory" },
        { l: "Observation of practiced task execution", r: "Procedural Memory" }
      ]
    },
    {
      id: "t4q7", type: "single", title: "Iterative Design Process",
      prompt: "Within an iterative design process, what is the specific relationship between a summative evaluation of version 'n' and a formative evaluation of version 'n+1'?",
      options: [
        { t: "They are independent processes that should not overlap." },
        { t: "A summative evaluation of one design often serves as a formative evaluation for the next development step.", c: true },
        { t: "Formative evaluation must always precede summative evaluation in every single iteration." },
        { t: "Summative evaluation is only used for final products and cannot inform future designs." }
      ]
    },
    {
      id: "t4q8", type: "match", title: "Mental Workload",
      prompt: "Match the criterion for creating a measure of mental workload to its corresponding methodological concern.",
      pairs: [
        { l: "Reliability", r: "Same estimate for same task and operator" },
        { l: "Diagnosticity", r: "Indicates cause of workload variation" },
        { l: "Selectivity", r: "Avoids influence of unrelated factors" },
        { l: "Sensitivity", r: "Detects changes in task demand" }
      ]
    },
    {
      id: "t4q9", type: "single", title: "NASA-TLX",
      prompt: "What is the primary methodological purpose of the second step in the NASA Task Load Index (NASA-TLX), which involves 15 pairwise comparisons?",
      options: [
        { t: "To increase the number of data points for better statistical significance." },
        { t: "To weight the workload dimensions according to which factors the participant considers most important for the specific task.", c: true },
        { t: "To verify that the participant provided consistent answers in the first step." },
        { t: "To transform subjective Likert-scale results into objective physical measurements." }
      ]
    },
    {
      id: "t4q10", type: "match", title: "Sampling Strategy",
      prompt: "Match the sampling strategy to its correct definition.",
      pairs: [
        { l: "Random Sampling", r: "Everyone in a list has an equal probability of being selected" },
        { l: "Stratified Sampling", r: "Selection ensures participants reflect the distribution (e.g. gender) of the target population" },
        { l: "Systematic Sampling", r: "Participants are chosen based on a predefined criterion, such as every 10th person" },
        { l: "Sample of Convenience", r: "Participants are selected because they are easily available" }
      ]
    },
    {
      id: "t4q11", type: "multi", title: "Secondary Task Study",
      prompt: "Which of the following outcomes are mentioned in the lecture as indicators associated with increased workload in secondary-task performance? (Select all that apply)",
      options: [
        { t: "Increased variability in a rhythmic tapping task.", c: true },
        { t: "A decline in the degree of randomness in a random number generation task.", c: true },
        { t: "Increased reaction time to a probe stimulus.", c: true },
        { t: "Reduced accuracy in the secondary task.", c: true }
      ]
    },
    {
      id: "t4q12", type: "match", title: "Ubicomp Field Studies",
      prompt: "Match the Ubicomp field study type to its corresponding result or goal.",
      pairs: [
        { l: "Studies of current behavior", r: "Better understanding of current technology use and future implications" },
        { l: "Proof-of-concept studies", r: "Validation of whether a new technology functions in the real world" },
        { l: "Experience studies", r: "Understanding behavioral change over a long period (weeks/months)" }
      ]
    },
    {
      id: "t4q13", type: "single", title: "Validity",
      prompt: "If a researcher is concerned that their laboratory conditions do not sufficiently reflect the “real-world” context of the users, which specific type of validity is being questioned?",
      options: [
        { t: "Internal Validity" },
        { t: "External Validity" },
        { t: "Ecological Validity", c: true },
        { t: "Construct Validity" }
      ],
      explain: "External validity is closely related, but ecological validity specifically targets the setting."
    },
    {
      id: "t4q14", type: "multi", title: "Variables",
      prompt: "When designing a study, which of the following are considered “extraneous” or “confounding” variables that can distort results if not controlled through randomization, matching, standardization, or procedural controls? (Select all that apply)",
      options: [
        { t: "The participant's prior knowledge about the system being tested.", c: true },
        { t: "Environmental factors like room temperature or noise levels during an interview.", c: true },
        { t: "The independent variable manipulated by the researcher." },
        { t: "The attitude or bias of the interviewer toward the system.", c: true }
      ]
    }
  ]
}
];
