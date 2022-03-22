import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
  Timestamp,
} from "firebase/firestore";

interface DocumentSnapshotType {
  [key: string]: any | Timestamp;
}

export const converter = <
  T extends DocumentSnapshotType
>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => {
    Object.keys(data).forEach((key) => {
      // Date型の値をTimestamp型に変換する
      if (
        typeof data[key].toString == "function" &&
        typeof data[key].toString().call == "function" &&
        data[key].toString().call(new Date())
      ) {
        (data as DocumentSnapshotType)[key] = Timestamp.fromDate(data[key]);
      }
    });
    return data;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>) => {
    const data = snapshot.data();
    Object.keys(data).forEach((key) => {
      // Timestamp型の値をDate型に変換する
      if (
        typeof data[key].toString == "function" &&
        data[key].toString().startsWith("Timestamp")
      ) {
        (data as DocumentSnapshotType)[key] = data[key].toDate();
      }
    });

    return data;
  },
});
