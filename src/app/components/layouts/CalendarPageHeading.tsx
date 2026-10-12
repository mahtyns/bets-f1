import Title from "../atoms/Title";
import { Label } from "../atoms/Label";
import { calendarContent } from "@/app/content/calendar";
import Text from "../atoms/Text";

export const CalendarPageHeading = () => {
    const mainClass = "upcoming-heading"

    const fullTitle = calendarContent.pageH1
    return (
        <section id="upcoming-heading" className={mainClass}>
            <Label text="OFFICIAL SCHEDULE" variant="primary" mainClass={mainClass} />
            <Title isH1={true} title={fullTitle} />
            <Text text={calendarContent.description} variant="primary" mainClass={mainClass} />
        </section>
    )
}
