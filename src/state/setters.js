
import { cardBeingEditedId } from "./signals";

export function setCardBeingEditedId(id) {
    cardBeingEditedId.value = id;
  }
  