import { scoringRules } from "@/app/content/scoring-rules";
import { ScoringRulesHeader } from "../../organisms/scoring-rules/ScoringRulesHeader";
import { ScoringTextBlock } from "../../organisms/scoring-rules/ScoringTextBlock";

export const ScoringParagraphs = () => {
    const mainClass = "scoring-rules"
    return (
        <>
            <ScoringRulesHeader mainClass={mainClass} title={scoringRules.pageTitle} description={scoringRules.pageDescription} />
            <section className={`${mainClass}__description`}>
                {scoringRules.paragraphs.map(paragraph => <ScoringTextBlock key={paragraph.paragraphTitle} mainClass={mainClass} title={paragraph.paragraphTitle} text={paragraph.paragraphText} />)}
            </section>
        </>
    )
}
