#include <stdio.h>
#include <time.h>

#define NUM_QUESTIONS 10
#define QUIZ_TIME_SECONDS 300   
#define PASS_PERCENTAGE 40.0

typedef struct {
    const char *question;
    const char *options[4];
    int correct;                
} Question;

static const Question java_quiz[NUM_QUESTIONS] = {
    {"Who is known as the Father of Java?",
     {"Dennis Ritchie", "James Gosling", "Bjarne Stroustrup",
      "Guido van Rossum"}, 2},
    {"What is the full form of JVM?",
     {"Java Virtual Machine", "Java Variable Machine",
      "Java Verified Machine", "Java Vendor Machine"}, 1},
    {"Which keyword is used for inheritance in Java?",
     {"implements", "extends", "inherit", "super"}, 2},
    {"Which company originally developed Java?",
     {"Microsoft", "Oracle", "Sun Microsystems", "IBM"}, 3},
    {"Java is a _____ language.",
     {"Procedural", "Machine", "Object Oriented", "Assembly"}, 3},
    {"Which method starts a Java program?",
     {"start()", "run()", "main()", "execute()"}, 3},
    {"Which keyword creates an object?",
     {"create", "new", "class", "object"}, 2},
    {"Which package is imported automatically?",
     {"java.io", "java.util", "java.lang", "java.net"}, 3},
    {"Java source file extension is?",
     {".class", ".exe", ".java", ".jar"}, 3},
    {"Java bytecode extension is?",
     {".java", ".jar", ".class", ".txt"}, 3}
};

static const Question python_quiz[NUM_QUESTIONS] = {
    {"Who developed Python?",
     {"Dennis Ritchie", "James Gosling", "Guido van Rossum",
      "Bjarne Stroustrup"}, 3},
    {"Python was released in?",
     {"1989", "1991", "1995", "2000"}, 2},
    {"Which symbol is used for comments?",
     {"//", "#", "/*", "--"}, 2},
    {"Which function prints output?",
     {"echo()", "display()", "print()", "show()"}, 3},
    {"Which function takes input?",
     {"scan()", "input()", "get()", "read()"}, 2},
    {"Python is a _____ language.",
     {"Compiled", "Assembly", "Interpreted", "Machine"}, 3},
    {"List is represented by?",
     {"{}", "()", "[]", "<>"}, 3},
    {"Tuple is represented by?",
     {"[]", "{}", "()", "<>"}, 3},
    {"Dictionary is represented by?",
     {"[]", "{}", "()", "<>"}, 2},
    {"Which keyword defines a function?",
     {"function", "fun", "def", "define"}, 3}
};

static const Question javascript_quiz[NUM_QUESTIONS] = {
    {"Who developed JavaScript?",
     {"Brendan Eich", "James Gosling", "Guido van Rossum",
      "Dennis Ritchie"}, 1},
    {"JavaScript was created in?",
     {"1995", "1991", "2000", "1985"}, 1},
    {"JavaScript file extension is?",
     {".java", ".py", ".js", ".jsx"}, 3},
    {"Which tag is used for JavaScript in HTML?",
     {"<java>", "<script>", "<js>", "<javascript>"}, 2},
    {"Which function prints output in browser?",
     {"print()", "console.log()", "echo()", "show()"}, 2},
    {"Which keyword declares a variable?",
     {"var", "int", "string", "float"}, 1},
    {"Modern variable keyword is?",
     {"let", "int", "float", "char"}, 1},
    {"Constant variable keyword is?",
     {"let", "var", "const", "fixed"}, 3},
    {"Which symbol is used for comments?",
     {"#", "//", "--", "**"}, 2},
    {"JavaScript is a _____ language.",
     {"Compiled", "Interpreted", "Assembly", "Machine"}, 2}
};


static int read_choice(void)
{
    char line[64];
    int value;

    if (fgets(line, sizeof line, stdin) == NULL)
        return -2;
    if (sscanf(line, "%d", &value) != 1)
        return -1;
    return value;
}

static int confirm_exit(void)
{
    char line[64];

    printf("Are you sure you want to exit the quiz? (y/n): ");
    if (fgets(line, sizeof line, stdin) == NULL)
        return 1;
    return (line[0] == 'y' || line[0] == 'Y');
}

static void show_result(int score, int total)
{
    double percentage = ((double)score / total) * 100.0;

    printf("\n==============================\n");
    printf("          QUIZ RESULT\n");
    printf("==============================\n");
    printf("Score      : %d/%d\n", score, total);
    printf("Percentage : %.2f%%\n", percentage);
    printf("Result     : %s\n",
           percentage >= PASS_PERCENTAGE ? "PASS" : "FAIL");
    printf("==============================\n\n");
}

static void start_quiz(const Question *questions, int total,
                       const char *title)
{
    int score = 0;
    int current = 0;
    time_t start = time(NULL);

    printf("\n===== %s =====\n", title);
    printf("Total Questions: %d | Time Limit: %d seconds\n",
           total, QUIZ_TIME_SECONDS);
    printf("Enter 1-4 to select an answer, or 0 to exit the quiz.\n");

    while (current < total) {
        int time_left = QUIZ_TIME_SECONDS
                        - (int)difftime(time(NULL), start);
        int choice;

        if (time_left <= 0) {
            printf("\nTime is up!\n");
            show_result(score, total);
            return;
        }

        printf("\nTime Left: %d seconds\n", time_left);
        printf("Q%d. %s\n", current + 1, questions[current].question);
        for (int i = 0; i < 4; i++)
            printf("   %d) %s\n", i + 1, questions[current].options[i]);

        
        for (;;) {
            printf("Your answer (1-4, 0 = Exit Quiz): ");
            choice = read_choice();

            if (choice == -2) {             
                printf("\n");
                return;
            }
            if (choice == 0) {
                if (confirm_exit())
                    return;
                continue;
            }
            if (choice >= 1 && choice <= 4)
                break;
            printf("Error: Please select an answer.\n");
        }

       
        if ((int)difftime(time(NULL), start) >= QUIZ_TIME_SECONDS) {
            printf("\nTime is up!\n");
            show_result(score, total);
            return;
        }

        if (choice == questions[current].correct)
            score++;
        current++;
    }

    show_result(score, total);
}

int main(void)
{
    for (;;) {
        int choice;

        printf("==============================\n");
        printf("       PROGRAMMING QUIZ\n");
        printf("==============================\n");
        printf("  1. JAVA\n");
        printf("  2. PYTHON\n");
        printf("  3. JAVASCRIPT\n");
        printf("  4. Exit\n");
        printf("Select a quiz: ");

        choice = read_choice();
        if (choice == -2)
            break;

        switch (choice) {
        case 1:
            start_quiz(java_quiz, NUM_QUESTIONS, "Java Quiz");
            break;
        case 2:
            start_quiz(python_quiz, NUM_QUESTIONS, "Python Quiz");
            break;
        case 3:
            start_quiz(javascript_quiz, NUM_QUESTIONS,
                       "JavaScript Quiz");
            break;
        case 4:
            printf("Thank you for using the "
                   "Programming Quiz System.\n");
            return 0;
        default:
            printf("Invalid choice. Please enter 1, 2, 3 or 4.\n\n");
        }
    }
    return 0;
}
