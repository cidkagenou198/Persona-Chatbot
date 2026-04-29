# reflection.md

Building this assignment made one thing very clear: the quality of the chatbot depends heavily on the quality of the prompt. That is the most practical lesson I took from GIGO. If the prompt is generic, the output becomes generic, even if the UI and backend are working perfectly. On the other hand, when the prompt contains a clear persona description, response style, constraints, and good few-shot examples, the model becomes much more consistent.

What worked best was separating the three personas clearly. Instead of writing one general teaching assistant and changing only the name, I gave each persona a different communication style, response pattern, and topic emphasis. That made the chatbot feel much more intentional. Anshuman's prompt was designed to sound structured and practical, Abhimanyu's to sound reflective and analogy-driven, and Kshitij's to sound technical and direct. Even in a simple UI, that difference becomes noticeable.

Another thing that worked well was keeping the prompts on the backend instead of the frontend. This made the application architecture cleaner and ensured the system prompts were passed securely during the API call. It also made the frontend simpler because it only needed to send the selected persona and the conversation messages.

The biggest lesson from GIGO was that prompt writing is not just wording, it is product design. Every instruction changes the behavior of the model. If I leave the format loose, the response becomes unpredictable. If I do not add constraints, the model drifts. If I do not include examples, the persona feels weaker. Good input does not guarantee perfection, but bad input almost guarantees shallow output.

If I were improving this further, I would spend more time doing verified persona research from public talks, interviews, and educational material so the voices feel even more authentic. I would also add persistent chat history, loading states with better polish, and deployment screenshots in the README. The current version is functional and structured well, but the prompt quality can still be made stronger with deeper research.
