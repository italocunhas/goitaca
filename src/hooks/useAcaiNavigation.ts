import { useState } from 'react';

type Step = 'tamanho' | 'base' | 'cobertura' | 'complementos' | 'extras';

export function useAcaiNavigation() {
  const [currentStep, setCurrentStep] = useState<Step>('tamanho');

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 150; // altura do header + espaço extra
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNextStep = (currentStep: Step) => {
    const steps: Step[] = ['tamanho', 'base', 'cobertura', 'complementos', 'extras'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      scrollToSection(nextStep);
      setCurrentStep(nextStep);
    }
  };

  return {
    currentStep,
    scrollToNextStep,
    scrollToSection
  };
} 