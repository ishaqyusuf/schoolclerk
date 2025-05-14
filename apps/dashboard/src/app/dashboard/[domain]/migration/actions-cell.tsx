import { Menu } from "@/components/menu";
import { StudentRecord } from "./data";
import { useMigrationStore } from "./store";
import { dotName } from "./utils";
import { generateRandomString } from "@/utils/utils";
import { updateStudent } from "./server";

export function Actions({ student }: { student: StudentRecord }) {
  const store = useMigrationStore();
  async function markAsFree(e) {
    const data = student?.paymentData?.storePayments;
    Object.entries(data?.billables).map(([a, b]) => {
      data.billables[a].free = true;
    });
    const studentName = student.fullName;
    const { postId, ...rest } = data;
    updateStudent(postId, student.classRoom, studentName, rest).then(
      (postId) => {
        data.postId = postId;
        console.log({ postId });
        store.update(
          `studentPayments.${student.classRoom}.${studentName}`,
          data,
        );
        store.update("refreshToken", generateRandomString());
      },
    );
  }
  return (
    <Menu>
      <Menu.Item onClick={markAsFree}>Free</Menu.Item>
    </Menu>
  );
}
