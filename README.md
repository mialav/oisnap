# oisnap – what's going on?

[Oisnap](https://oisnap.herokuapp.com/home) enables the user to spot, snap and pin on the map exciting events around them that they would like to share with other users. Oisnap was created as the final project for the Ironhack bootcamp by Mia Lavanti, Nora Nicklis and Karolina Czarnowska

## How does it work?

Oisnap is best viewed on mobile. Oisnap is a service that allows logged in users to pin pictures on a map that fit into one of four categories – crowds/lines, offers/discounts, free stuff, and happenings. 

Anyone can view the map around them and look at "snaps", but only logged in users can add snaps to the map, as well as edit their previous snaps. Each snap appears as a pin on the map, color coded based on category. A snap is only visible on the map for 24 hours to keep the snaps relevant and timely. Once a snap has been posted, the pin slowly begins to fade color until it is no longer visible. 

To add gamification elements, a user is always awarded points for a snap that they have posted. If a user decides for some reason to delete a snap, these points get deducted from their overall score. A faded snap or a snap that has disappeared over time does not lower the score.

Users are also able to filter through snaps based on category. 

## Technologies

To create oisnap, we used React.js, Node.js, Passport, HTML/CSS as well as the Mapbox API. I (Mia) focused on working with the Mapbox Api as well as working with the database models and using our database to display Snaps on the frontend.

## Next steps

We want to also incorporate a search for users to look for specific key words in order to find snaps relevant to them. We want to take the gamification aspect further by creating levels that users can reach by increasing their Snap scores. We also want to work on the styling and making the app more user friendly.

