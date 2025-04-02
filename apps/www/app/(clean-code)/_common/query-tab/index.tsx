import Link from "next/link";
import { Icons } from "@/components/_v1/icons";
import { isEmpty } from "lodash";

import { Button } from "@gnd/ui/button";

import { useQueryTabStore } from "./data-store";
import { SiteLinksPage } from "./links";
import { useQueryTab } from "./provider";

interface Props {
    page: SiteLinksPage;
}
export default function QueryTab({ page }: Props) {
    const qt = useQueryTab(page);
    const store = useQueryTabStore();

    return (
        <div>
            {store.pageInfo?.links?.map((link, index) => (
                <Button
                    asChild
                    key={index}
                    className="h-8 rounded-none text-xs"
                    variant={
                        store.pageInfo?.currentTabIndex ==
                        link?.tabIndex?.tabIndex
                            ? "default"
                            : "outline"
                    }
                >
                    <Link href={`?${link.query}`}>{link.title}</Link>
                </Button>
            ))}
            {!isEmpty(store.pageInfo?.query) && (
                <Button
                    size="sm"
                    onClick={() => {
                        qt.createTab();
                    }}
                    className="h-8 text-xs"
                    variant="outline"
                >
                    <Icons.add className="size-4" />
                    <span>Query Tab</span>
                </Button>
            )}
        </div>
    );
}
