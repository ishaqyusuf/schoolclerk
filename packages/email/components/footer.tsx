import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";

import { getAppUrl } from "@school-clerk/utils/envs";

const baseUrl = getAppUrl();

export function Footer() {
  return (
    <Section className="w-full">
      <Hr />

      <br />

      <Text className="font-regular text-[21px]">
        {/* Run your business smarter. */}
      </Text>

      <br />

      {/* <TripleColumn
                pX={0}
                pY={0}
                styles={{ textAlign: "left" }}
                columnOneContent={
                    <Section className="text-left p-0 m-0">
                        <Row>
                            <Text className="font-medium">Features</Text>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/bOp4NOx"
                            >
                                Overview
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/VFcNsmQ"
                            >
                                Inbox
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/uA06kWO"
                            >
                                Vault
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/x7Fow9L"
                            >
                                Tracker
                            </Link>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/fkYXc95"
                            >
                                Invoice
                            </Link>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/dEnP9h5"
                            >
                                Pricing
                            </Link>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/E24P3oY"
                            >
                                Engine
                            </Link>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://midday.ai/download"
                            >
                                Download
                            </Link>
                        </Row>
                    </Section>
                }
                columnOneStyles={{
                    paddingRight: 0,
                    paddingLeft: 0,
                    width: 185,
                }}
                columnTwoContent={
                    <Section className="text-left p-0 m-0">
                        <Row>
                            <Text className="font-medium">Resources</Text>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/fhEy5CL"
                            >
                                Homepage
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://git.new/midday"
                            >
                                Github
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/ZrhEMbR"
                            >
                                Support
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/rofdWKi"
                            >
                                Terms of service
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/TJIL5mQ"
                            >
                                Privacy policy
                            </Link>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/IQ1kcN0"
                            >
                                Branding
                            </Link>
                        </Row>

                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/x5ohOs7"
                            >
                                Feature Request
                            </Link>
                        </Row>
                    </Section>
                }
                columnTwoStyles={{
                    paddingRight: 0,
                    paddingLeft: 0,
                    width: 185,
                }}
                columnThreeContent={
                    <Section className="text-left p-0 m-0">
                        <Row>
                            <Text className="font-medium">Company</Text>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/186swoH"
                            >
                                Story
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/QWyX8Um"
                            >
                                Updates
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/Dd7M8cl"
                            >
                                Open startup
                            </Link>
                        </Row>
                        <Row className="mb-1.5">
                            <Link
                                className="text-[#707070] text-[14px]"
                                href="https://go.midday.ai/M2Hv420"
                            >
                                OSS Friends
                            </Link>
                        </Row>
                    </Section>
                }
                columnThreeStyles={{
                    paddingRight: 0,
                    paddingLeft: 0,
                    width: 185,
                }}
            /> */}

      <br />
      <br />

      {/* <Row>
                <Column className="align-middle w-[40px]">
                    <Link href="https://go.midday.ai/lS72Toq">
                        <Img
                            src={`${baseUrl}/email/x.png`}
                            width="22"
                            height="22"
                            alt="Midday on X"
                        />
                    </Link>
                </Column>
                <Column className="align-middle w-[40px]">
                    <Link href="https://go.midday.ai/7rhA3rz">
                        <Img
                            src={`${baseUrl}/email/producthunt.png`}
                            width="22"
                            height="22"
                            alt="Midday on Producthunt"
                        />
                    </Link>
                </Column>

                <Column className="align-middle w-[40px]">
                    <Link href="https://go.midday.ai/anPiuRx">
                        <Img
                            src={`${baseUrl}/email/discord.png`}
                            width="22"
                            height="22"
                            alt="Midday on Discord"
                        />
                    </Link>
                </Column>

                <Column className="align-middle">
                    <Link href="https://go.midday.ai/Ct3xybK">
                        <Img
                            src={`${baseUrl}/email/linkedin.png`}
                            width="22"
                            height="22"
                            alt="Midday on LinkedIn"
                        />
                    </Link>
                </Column>
            </Row> */}

      <br />
      <br />

      <Row>
        <Text className="text-xs text-[#B8B8B8]">
          GND Millwork - 13285 SW 131 ST Miami, Fl 33186.
        </Text>
      </Row>

      <Row>
        <Link
          className="text-[14px] text-[#707070]"
          // href="https://app.midday.ai/settings/notifications"
          title="Unsubscribe"
        >
          Notification preferences
        </Link>
      </Row>

      <br />
      <br />

      <Row>
        <Link
        // href="https://gnd-prodesk.vercel.app"
        >
          <Img
            src={`${baseUrl}/email/logo-footer.png`}
            width="100"
            alt="GndMillwork"
            className="block"
          />
        </Link>
      </Row>
    </Section>
  );
}
