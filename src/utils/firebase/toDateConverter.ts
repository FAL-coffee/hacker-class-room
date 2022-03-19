import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";

interface DocumentSnapshotType {
  [key: string | number]: any;
}

export const toDateConverter = <
  T extends DocumentSnapshotType
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>) => {
    const data = snapshot.data();
    Object.keys(data).forEach((key, i) => {
      if (
        typeof data[key].toString == "function" &&
        data[key].toString().startsWith("Timestamp")
      ) {
        data[i] = data[key].toDate();
      }
    });

    return data;
  },
});
