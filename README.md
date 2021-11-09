# Beam Mobile App Exercise

In this kata, you will be providing a member with their very own Beam app! From within the app, they will be able to view their member info, as well as add/update/delete/view their brushing data.

Treat this like an MVP for a production app. Be thinking about what the minimal implementation is needed to send this out to users, while also building the foundation to add future functionality.

## Getting Started

### Expectations

Please read through the user stories below and implement the functionality to complete them according to their requirements. The design is entirely up to you as long as the solution can be run following the requirements outlined under `Language/Framework`.

Please add a section explaining the technical decision making involved in designing your solution. What options were you considering at various levels (eg. tech stack choice, libraries, and design, as applicable) and what were the tradeoffs in choosing one option over another? Feel free to include this section here in this README.

#### Language/Framework

For submission, we allow the following languages or frameworks to be used as a baseline. Specific requirements are included below for the different tech stack options. We highly recommend going the route of creating a react native application for this exercise, but have included other acceptable options below:

- **React Native Application:**

  - Latest version of react-native, with or without Expo
  - Cross platform support running on both iPhone Xs Simulator and Pixel 4 Emulator\
    _**Note:** If you do not have hardware available to you for building/running on iOS, please indicate this in your submission._

- **Android Application:**

  - Latest version of Android Studio, Java or Kotlin
  - Target build and testing for Android API 30 or later
  - Running on a Pixel 4 Emulator

- **iOS Application:**

  - Latest version of Xcode, Swift and iOS SDK
  - Target build and testing for latest version of iOS (13 or later)
  - Running on the iPhone Xs Simulator

**Please include instructions detailing how to build/run your submission in the README.**

#### UI/UX Design

You may have noticed: there is no mockup or prototype provided. You have free rein in the UI/UX Design of this exercise!

That's not to say we expect you to be a UI/UX Designer. At a minimum, we're just expecting to see tasteful alignment and use of the branding assets included.

#### Testing

Beam firmly believes in testing as a practice and as such we ask that you please add tests. **Instructions for running your tests should be included in the README.** We also ask that you commit your work to git frequently as you go.

## Submitting your work to Beam

Once you're happy with your submission, you can send it back in one of two formats; either as a git bundle or a zip file.

To create the git bundle simply execute:

```bash
cd beam-mobile-exercise
git bundle create beam-mobile-exercise.bundle <YOUR BRANCH NAME HERE>
```

This will create a `.bundle` file which contains the entire git repository in binary form, so you can easily send it as an attachment. Alternately, you can zip the project instead.

## Exercise

The steps for this exercise are broken out into user stories below.

**NOTE:** If you are applying for a senior position, we would expect to see multiple screens implemented and the ability to navigate between them (as described in the acceptance criteria below). Otherwise, if you are not applying for a senior role, it is perfectly acceptable to create a single page app and ignore navigation for this exercise.

### User Stories

#### Member Info Screen

_As a Beam Member_  
_I want to have a Member Info screen_  
_So I can view my member information_

Acceptance Criteria

- There is a page for member information.
- The Beam logo (see `assets/images/beam_logo.svg`) is displayed at the top of the page.
- The member's `name` is displayed on the Member Info screen. (See [Getting the Member Data](#getting-the-member-data))
- The member's `shipping_address`, `shipping_city`, `shipping_state` and `shipping_zip_code` are all displayed on the screen in a "Shipping Address" section on the Member Info Screen.

#### Member Info Refresh

_As a Beam Member_\
_I want to retrieve my updated member information_\
_So that my user information matches changes I've made on the Beam site_

Acceptance Criteria

- There is a mechanism for refreshing the member information on the Member Info Screen
- An activity indicator is displayed while reloading the information
- Errors that occur during the network request are gracefully handled, not causing application hangs or crashes

#### Member's Brushing Information Summary

_As a Beam Member_  
_I want a section on the Member Info screen that shows brushing history_  
_So that I can view my brushing history_

Acceptance Criteria

- The member's Brushing History records (date/time and duration) are displayed on the Member Info screen in a list or table view

#### Member's Brushing Information Screen

_As a Beam Member_  
_I want a screen to look at a brush record_  
_So that I can edit/create new brush actions_

Acceptance Criteria

- The Brushing Info screen shows an editable Date/Time and brush Duration (minutes)
- The Brushing Info screen has a cancel and save button

#### Member's Brushing Information Creation

_As a Beam Member_  
_I want to be able to create brushing information records_  
_So that I can add brush actions_

Acceptance Criteria

- There is a button to add a new Brushing Info record on the Member Info screen, located above the brushing history table/list
- When the add button is tapped, the Brushing Information screen is loaded with a new record, and the date/time defaults to current date/time
- When Save is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and can view my new record in the history list/table
- When Cancel is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and the new record is discarded

#### Member's Brushing Information Update

_As a Beam Member_  
_I want to be able to edit brushing information records_  
_So that I can edit brush actions_

Acceptance Criteria

- There is an edit option on the existing Brushing Info records on the Member Info screen
- When edit is tapped, the Brushing Information screen is loaded with the date/time and brush duration populated with the selected record data
- When Save is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and the history list/table reflects the updated record
- When Cancel is tapped on the Brushing Information screen, I am returned to the Member Info Screen, and the record changes are discarded

#### Member's Brushing Information Delete

_As a Beam Member_  
_I want to be able to delete brushing information records_  
_So that I can remove brush actions_

Acceptance Criteria

- There is a delete option on the existing Brushing Info records on the Member Info screen
- When delete is tapped, I am prompted: "Are you sure you would like to delete the record from [Date/Time]?" with "Yes" and "No" options
- If "No" is selected, I am returned to the Member Info Screen with no changes to the data
- If "Yes" is selected, the Brushing Info record is removed, I am returned to the Member Info Screen, and the history list/table reflects the removed record

---

### Getting the Member Data

For this exercise, you'll be displaying the data for a member named "Remy LeBeau". We've gone ahead and searched for his name in the system. For this exercise, implement a request to load the member info history from [https://member-data.beam.dental/memberInfoHistory.json](https://member-data.beam.dental/memberInfoHistory.json) as if it were from a RESTful API.

This api call will return the historical data for Remy. You'll need to sort through this to get his most recent data. The valid member record for Remy has the most recent `effective_date`.

#### Decisions

I decided to go with react navigation to allow a different screen to be pulled up with creating a record. I chose react testing library to write tests. I feel like this is a good option and was used because of the friendly docs and ample amount of tutorials. Teh biggest decision was to setup a way to save the brushing records so they could be accessed after a save. I decided to go with AsyncStorage because of the ease and quickness of use. In a actual app, I probably would save them with a server call, and possibly a redux store locally. Although, I have wokred with Realm for a local storage and do like that option.
I'm using react native date picker for a easy way to pick a date. I like the UI and it's easy to implement. I chose axios for my api calls because that is what I am most familiar with. Moment is a must for formatting dates.
I did have an issue I could not resolve and I hope that it could be over looked, don't have a ton of experience writing test cases. In UserInfo.test.tsx I could not mock getUserInfo so the screen would always be calling a ActivityIndicator so I couldn't test against any of the other code.
# BeamMobileExercise
