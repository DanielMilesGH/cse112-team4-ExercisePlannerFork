/**
 * Load card data from local storage.
 * @returns {Array} - The array of existing card data.
 */
function getLocalCardData() {
  const existingData = localStorage.getItem("exerciseCardData");
  return existingData ? JSON.parse(existingData) : [];
}

/**
 * Save the exercise card data to local storage.
 * @param {HTMLElement} exerciseCard - The exercise card element to save.
 */
function saveExerciseCardToLocal(exerciseCard) {
  const exerciseCardData = exerciseCard.cardData();
  let existingData = getLocalCardData();
  let cardIndex = findCardIndexInExistingData(exerciseCard, existingData);
  if (cardIndex != -1) {
    let foundCard = existingData[cardIndex];
    updateExerciseCardInLocal(foundCard, exerciseCard);
  } else {
    existingData.push(exerciseCardData);
  }
  localStorage.setItem("exerciseCardData", JSON.stringify(existingData));
}

/**
 * Delete the exercise card data from local storage.
 * @param {HTMLElement} exerciseCard - The exercise card element to delete.
 */
function deleteExerciseCardFromLocal(exerciseCard) {
  let existingData = getLocalCardData();
  let cardIndex = findCardIndexInExistingData(exerciseCard, existingData);
  if (cardIndex !== -1) {
    existingData.splice(cardIndex, 1); // Remove the card from existingData
    localStorage.setItem("exerciseCardData", JSON.stringify(existingData)); // Save updated data to localStorage
  }
}

/**
 * Update an exercise card in local storage.
 * @param {Object} cardToUpdate - The card data to be updated.
 * @param {HTMLElement} referenceCard - The exercise card providing new data.
 */
function updateExerciseCardInLocal(cardToUpdate, referenceCard) {
  cardToUpdate.exerciseType = referenceCard.exerciseType;
  cardToUpdate.exercise = referenceCard.exercise;
  cardToUpdate.calories = referenceCard.calories;
  cardToUpdate.sets = referenceCard.sets;
  cardToUpdate.duration = referenceCard.duration;
  cardToUpdate.time = referenceCard.time;
  cardToUpdate.notes = referenceCard.notes;
  cardToUpdate.completed = referenceCard.completed;
}

/**
 * Discard changes to an exercise card and revert to saved data from local storage.
 * @param {HTMLElement} exerciseCard - The exercise card element to discard changes for.
 */
function discardExerciseCardInLocal(exerciseCard) {
  let existingData = getLocalCardData();
  let cardIndex = findCardIndexInExistingData(exerciseCard, existingData);
  if (cardIndex !== -1) {
    let foundCard = existingData[cardIndex];
    updateExerciseCardInLocal(exerciseCard, foundCard);
  }
}

/**
 * Find the index of the given exercise card in the existing data.
 * @param {HTMLElement} exerciseCard - The exercise card element to find.
 * @param {Array} existingData - The array of existing card data.
 * @returns {number} - The index of the found card data or -1 if not found.
 */
function findCardIndexInExistingData(exerciseCard, existingData) {
  return existingData.findIndex((cardData) => {
    return cardData.id === exerciseCard.id;
  });
}

/**
 * Repopulate the exercise cards from local storage data.
 * @param {Array} existingData - The array of existing card data.
 */
function populateCardsFromLocal(existingData) {
  // Loop through the saved data and create/populate cards
  existingData.forEach((cardData) => {
    const newExerciseCard = document.createElement("exercise-card");

    // Set the card's ID to match the ID stored in cardData
    newExerciseCard.id = cardData.id;

    newExerciseCard.addEventListener("template-loaded", function () {
      newExerciseCard.exerciseType = cardData.exerciseType;
      newExerciseCard.exercise = cardData.exercise;
      newExerciseCard.calories = cardData.calories;
      newExerciseCard.sets = cardData.sets;
      newExerciseCard.duration = cardData.duration;
      newExerciseCard.time = cardData.time;
      newExerciseCard.notes = cardData.notes;
      newExerciseCard.completed = cardData.completed;
      newExerciseCard.populateExercises(
        newExerciseCard.exerciseType === ExerciseType.Cardio
          ? CardioExercise
          : StrengthExercise
      );
    });

    // Append the populated card to the container
    if (cardData.completed) {
      addCardToCompletedContainer(newExerciseCard);
    } else {
      addCardToScheduledContainer(newExerciseCard);
    }
  });
}
