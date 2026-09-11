# CourseFlow - Student Assignment Organizer

> **Final-pass links:** Public prototype: https://3screens.vercel.app/ | GitHub repository: https://github.com/bcarter54/3screens.git

## 1. Product foundation

- **Need:** College students need to keep deadlines straight when coursework is split across Canvas, Learning Suite, and different course sections. Repeatedly checking each system or copying dates into another tool costs time and risks missed work.
- **Persona:** A laptop-first college student taking at least two classes across multiple learning platforms. They often plan during gaps between classes or at the beginning of the week.
- **Primary capability:** View assignment information from multiple course platforms in one prioritized interface, then examine that work by class or due date.
- **Fundamental value:** **Organization and control.** The student can see what is coming, decide what deserves attention first, and spend less effort reconstructing their workload.

## 2. Three-screen scope

| Screen | Single job | Why it earned a slot | Design question examined |
| --- | --- | --- | --- |
| **Dashboard** | Answer, "What should I work on next?" | It delivers the immediate payoff of consolidation and prioritization. | Can a student identify the product's purpose and highest-priority task in seconds? |
| **Classes** | Show assignments grouped by course. | Students need a class-level view of workload and completion. | Do course cards, color cues, and the selected-course region make ownership clear? |
| **Weekly Agenda** | Show assignments by due date. | A time-based view reveals busy days and urgent deadlines. | Can a student scan the week and notice urgent work without feeling overwhelmed? |

## 3. Design question plan

These are predictions to test with the persona, not assumed findings.

| Question I would ask | Predicted answer | Prototype basis for the prediction |
| --- | --- | --- |
| "Think about the last time assignments piled up across classes. How did you keep track of everything?" | They used Notes, Google Calendar, or another free planning tool. | The Weekly Agenda uses the familiar time-based structure of that workaround. |
| "What would this need to do before you would replace your current system with it?" | Show everything at a glance while still allowing action on individual tasks. | The Dashboard consolidates both platforms, while completion controls manage each assignment. |
| "How often do you run into this problem, and what do you usually reach for?" | It happens weekly; they reach for Google Calendar or Google Tasks. | The prototype combines a weekly schedule with checkable tasks. |
| "I am going to show you the dashboard for five seconds. What do you think this app is for?" | It organizes coursework and identifies what to do next. | The revised headline, **Focus next** card, calendar strip, and completion summary signal priority. |

## 4. Design justification and first read

### Signaling and focus

The headline, **"Your coursework, in priority order,"** establishes prioritization, and the supporting line identifies Canvas and Learning Suite consolidation. The largest, darkest region is the **Focus next** assignment, using visual hierarchy and figure-ground contrast to direct attention. The week strip adds deadline context, progress shows completion, and the upcoming list explains what follows. Course Pulse connects the overview to the class-based screen, while profile details remain quiet.

### Gestalt grouping and consistency

- **Dashboard:** Common region separates the focus task, weekly schedule, upcoming work, and course summary. Proximity keeps each assignment's details together.
- **Classes:** Similarity makes course cards one set; repeated colors connect courses and assignments. The selected class and its work share a common region.
- **Weekly Agenda:** Common region and proximity place assignments within their due day. Repeated cards, typography, spacing, and controls maintain consistency.

Screens 2 and 3 stay on mission: Classes answers what belongs to each course, and Weekly Agenda answers when work is due. The persistent **Dashboard | Classes | Weekly Agenda** header appears throughout, providing an obvious route back to the landing screen from anywhere.

### Meaningful revision

The first AI draft overemphasized **"Good afternoon, Bryce."** It identified the user but not the capability or value, forcing viewers to infer the purpose from lower cards. I changed the dominant headline to **"Your coursework, in priority order,"** moved the greeting into the eyebrow, and named Canvas and Learning Suite in the supporting copy. The motivating question was, **"Can the user immediately tell what this is for?"** I also removed a visible navigation scrollbar because it suggested unintended interaction and competed with the three destinations.

| Before | After |
| --- | --- |
| A greeting held the strongest headline position, so the app's purpose had to be inferred. | The headline states the organizational value, the supporting copy explains integration, and the focus card answers what to do next. |
| Initial version: https://github.com/bcarter54/3screens/commit/df88101dffb9a16c31a73aa7e0eeb7f1d3fa2294 | Revised version: https://3screens.vercel.app/ |
