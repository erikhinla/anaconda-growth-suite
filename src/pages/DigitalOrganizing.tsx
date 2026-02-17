import DONavigation from "@/components/digital-organizing/DONavigation";
import DOHero from "@/components/digital-organizing/DOHero";
import DOProblem from "@/components/digital-organizing/DOProblem";
import DOClarity from "@/components/digital-organizing/DOClarity";
import DOProcess from "@/components/digital-organizing/DOProcess";
import DOOutcomes from "@/components/digital-organizing/DOOutcomes";
import DOFitFilter from "@/components/digital-organizing/DOFitFilter";
import DOConversion from "@/components/digital-organizing/DOConversion";
import DOTrust from "@/components/digital-organizing/DOTrust";
import DOFAQ from "@/components/digital-organizing/DOFAQ";
import DOCaseStudy from "@/components/digital-organizing/DOCaseStudy";
import DOClawBot from "@/components/digital-organizing/DOClawBot";
import DOTraffic from "@/components/digital-organizing/DOTraffic";
import DOConversionSystems from "@/components/digital-organizing/DOConversionSystems";
import DOFooter from "@/components/digital-organizing/DOFooter";

const DigitalOrganizing = () => {
  return (
    <div className="min-h-screen bg-white">
      <DONavigation />
      <DOHero />
      <DOProblem />
      <DOClarity />
      <DOProcess />
      <DOOutcomes />
      <DOFitFilter />
      <DOConversion />
      <DOTrust />
      <DOFAQ />
      <DOCaseStudy />
      <DOClawBot />
      <DOTraffic />
      <DOConversionSystems />
      <DOFooter />
    </div>
  );
};

export default DigitalOrganizing;
