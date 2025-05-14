import { Menu } from "@/components/menu";
import { StudentRecord } from "./data";
import { useMigrationStore } from "./store";
import { dotName } from "./utils";
import { generateRandomString } from "@/utils/utils";

export function Actions({ student }: { student: StudentRecord }) {
  const store = useMigrationStore();
  function markAsFree() {
    const data = student?.paymentData?.storePayments;
    Object.entries(data?.billables).map(([a, b]) => {
      data.billables[a].free = true;
    });
    const _name = dotName(student as any);
    store.update(`studentPayments.${student.classRoom}.${_name}`, data);
    store.update("refreshToken", generateRandomString());
  }
  return (
    <Menu>
      <Menu.Item onClick={markAsFree}>Free</Menu.Item>
    </Menu>
  );
}
