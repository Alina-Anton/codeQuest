export type AIReview = {
    strengths: string[];
    improvements: string[];
  };
  
  export const generateAIReview = (score: number): AIReview => {
    if (score >= 90) {
      return {
        strengths: [
          "Excellent debugging instincts",
          "Strong understanding of React performance",
          "Good product decision making"
        ],
        improvements: [
          "Consider deeper accessibility audits",
        ]
      };
    }
  
    if (score >= 60) {
      return {
        strengths: [
          "Good understanding of frontend fundamentals",
          "Solid debugging approach"
        ],
        improvements: [
          "Improve performance optimization strategy",
          "Strengthen accessibility awareness"
        ]
      };
    }
  
    return {
      strengths: [
        "Completed engineering simulation"
      ],
      improvements: [
        "React hook patterns",
        "Performance optimization techniques",
        "Accessibility awareness"
      ]
    };
  };