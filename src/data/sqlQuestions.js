// ═══════════════════════════════════════════════════════════
// SQL Question Bank — NeetCode-style with explanations
// ═══════════════════════════════════════════════════════════

export const sqlQuestions = [
    // ─── EASY ────────────────────────────────────────────────
    {
        id: 'sql-1',
        title: 'Customers With Positive Revenue',
        difficulty: 'easy',
        topic: 'Aggregation',
        leetcodeUrl: 'https://leetcode.com/problems/customers-with-positive-revenue-this-year/',
        statement: `Table: Customers\n\n| Column Name | Type |\n|-------------|------|\n| customer_id | int  |\n| year        | int  |\n| revenue     | int  |\n\nWrite an SQL query to report the customers with positive revenue in the year 2021.`,
        explanation: `Use a simple WHERE clause to filter by year = 2021 and revenue > 0. No joins needed — straightforward filter on a single table.`,
        approach: [
            'Filter rows where year = 2021',
            'Additionally filter where revenue > 0',
            'Select customer_id from the filtered result'
        ],
        solution: `SELECT customer_id\nFROM Customers\nWHERE year = 2021\n  AND revenue > 0;`,
        complexity: { time: 'O(N)', space: 'O(1)' }
    },
    {
        id: 'sql-2',
        title: 'Customers Without Orders',
        difficulty: 'easy',
        topic: 'Joins',
        leetcodeUrl: 'https://leetcode.com/problems/customers-who-never-order/',
        statement: `Table: Customers\n\n| Column Name | Type    |\n|-------------|----------|\n| id          | int      |\n| name        | varchar  |\n\nTable: Orders\n\n| Column Name | Type |\n|-------------|------|\n| id          | int  |\n| customerId  | int  |\n\nWrite an SQL query to report all customers who never order anything.`,
        explanation: `Use a LEFT JOIN between Customers and Orders and filter for NULL in Orders. Alternatively, use NOT IN or NOT EXISTS. LEFT JOIN approach is the most readable.`,
        approach: [
            'LEFT JOIN Customers with Orders on customerId',
            'Filter WHERE Orders.id IS NULL',
            'These are customers with no matching order row'
        ],
        solution: `SELECT c.name AS Customers\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customerId\nWHERE o.id IS NULL;`,
        complexity: { time: 'O(N + M)', space: 'O(N)' }
    },
    {
        id: 'sql-3',
        title: 'Combine Two Tables',
        difficulty: 'easy',
        topic: 'Joins',
        leetcodeUrl: 'https://leetcode.com/problems/combine-two-tables/',
        statement: `Table: Person\n\n| Column Name | Type    |\n|-------------|----------|\n| personId    | int      |\n| firstName   | varchar  |\n| lastName    | varchar  |\n\nTable: Address\n\n| Column Name | Type    |\n|-------------|----------|\n| addressId   | int      |\n| personId    | int      |\n| city        | varchar  |\n| state       | varchar  |\n\nWrite an SQL query to report the first name, last name, city, and state of each person. If an address is not present, report NULL.`,
        explanation: `This is a classic LEFT JOIN. Since some persons may not have an address, use LEFT JOIN so that persons without an address still appear with NULL values for city and state.`,
        approach: [
            'LEFT JOIN Person with Address on personId',
            'Select firstName, lastName, city, state',
            'NULL automatically fills in for missing address columns'
        ],
        solution: `SELECT p.firstName, p.lastName, a.city, a.state\nFROM Person p\nLEFT JOIN Address a ON p.personId = a.personId;`,
        complexity: { time: 'O(N + M)', space: 'O(N)' }
    },
    {
        id: 'sql-4',
        title: 'Top Travellers',
        difficulty: 'easy',
        topic: 'Aggregation',
        leetcodeUrl: 'https://leetcode.com/problems/top-travellers/',
        statement: `Table: Users\n\n| Column Name | Type    |\n|-------------|----------|\n| id          | int      |\n| name        | varchar  |\n\nTable: Rides\n\n| Column Name | Type |\n|-------------|------|\n| id          | int  |\n| user_id     | int  |\n| distance    | int  |\n\nWrite an SQL query to report the distance travelled by each user, ordered by travelled distance in descending order. If two or more users travelled the same distance, order them by their name in ascending order.`,
        explanation: `JOIN Users with Rides, use SUM(distance) grouped by user. Use COALESCE or IFNULL to return 0 for users with no rides. Order by total_dist DESC, name ASC.`,
        approach: [
            'LEFT JOIN Users with Rides on user_id',
            'GROUP BY user id and name',
            'SUM(distance) with IFNULL(..., 0)',
            'ORDER BY travelled_distance DESC, name ASC'
        ],
        solution: `SELECT u.name, IFNULL(SUM(r.distance), 0) AS travelled_distance\nFROM Users u\nLEFT JOIN Rides r ON u.id = r.user_id\nGROUP BY u.id, u.name\nORDER BY travelled_distance DESC, u.name ASC;`,
        complexity: { time: 'O(N log N)', space: 'O(N)' }
    },
    {
        id: 'sql-5',
        title: 'Calculate Special Bonus',
        difficulty: 'easy',
        topic: 'Conditional',
        leetcodeUrl: 'https://leetcode.com/problems/calculate-special-bonus/',
        statement: `Table: Employees\n\n| Column Name | Type    |\n|-------------|----------|\n| employee_id | int      |\n| name        | varchar  |\n| salary      | int      |\n\nWrite an SQL query to calculate the bonus of each employee. The bonus of an employee is 100% of their salary if the ID of the employee is an odd number and the employee's name does not start with the character 'M'. The bonus of an employee is 0 otherwise.`,
        explanation: `Use a CASE WHEN expression. Check if employee_id is odd (MOD(employee_id, 2) != 0) AND name NOT LIKE 'M%'. If both conditions true, bonus = salary, else 0.`,
        approach: [
            'Use CASE WHEN in SELECT',
            'Condition: MOD(employee_id, 2) = 1 AND name NOT LIKE \'M%\'',
            'THEN salary ELSE 0',
            'ORDER BY employee_id'
        ],
        solution: `SELECT employee_id,\n  CASE\n    WHEN MOD(employee_id, 2) = 1 AND name NOT LIKE 'M%' THEN salary\n    ELSE 0\n  END AS bonus\nFROM Employees\nORDER BY employee_id;`,
        complexity: { time: 'O(N)', space: 'O(1)' }
    },
    // ─── MEDIUM ───────────────────────────────────────────────
    {
        id: 'sql-6',
        title: 'Highest Grade For Each Student',
        difficulty: 'medium',
        topic: 'Aggregation',
        leetcodeUrl: 'https://leetcode.com/problems/highest-grade-for-each-student/',
        statement: `Table: Enrollments\n\n| Column Name | Type |\n|-------------|------|\n| student_id  | int  |\n| course_id   | int  |\n| grade       | int  |\n\nWrite an SQL query to find the highest grade with its corresponding course for each student. In case of a tie, you should find the course with the smallest course_id.`,
        explanation: `Find MAX(grade) per student, then join back to get the course_id. When grades tie, pick the smallest course_id. This requires a subquery or window function (ROW_NUMBER or RANK).`,
        approach: [
            'Use a subquery to find MAX(grade) per student_id',
            'JOIN back to Enrollments on student_id AND grade = max_grade',
            'For ties, use MIN(course_id) or ROW_NUMBER() OVER(PARTITION BY student_id ORDER BY grade DESC, course_id ASC)',
            'ORDER BY student_id'
        ],
        solution: `WITH RankedEnrollments AS (\n  SELECT student_id, course_id, grade,\n    ROW_NUMBER() OVER (\n      PARTITION BY student_id\n      ORDER BY grade DESC, course_id ASC\n    ) AS rn\n  FROM Enrollments\n)\nSELECT student_id, course_id, grade\nFROM RankedEnrollments\nWHERE rn = 1\nORDER BY student_id;`,
        complexity: { time: 'O(N log N)', space: 'O(N)' }
    },
    {
        id: 'sql-7',
        title: 'Customers Who Bought A and B but Not C',
        difficulty: 'medium',
        topic: 'Set Operations',
        leetcodeUrl: 'https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c/',
        statement: `Table: Customers\n\n| Column Name   | Type    |\n|----------------|----------|\n| customer_id    | int      |\n| customer_name  | varchar  |\n\nTable: Orders\n\n| Column Name | Type    |\n|-------------|----------|\n| order_id    | int      |\n| customer_id | int      |\n| product_name| varchar  |\n\nWrite an SQL query to report the customer_id and customer_name of customers who bought products 'A' and 'B' but did not buy product 'C'.`,
        explanation: `Use GROUP BY with HAVING to ensure the customer bought both A and B. Then exclude customers who also bought C using NOT IN or NOT EXISTS.`,
        approach: [
            'Find customers who bought product A',
            'Intersect with customers who bought product B',
            'Subtract customers who bought product C',
            'Use HAVING with conditional SUM or use set operations'
        ],
        solution: `SELECT c.customer_id, c.customer_name\nFROM Customers c\nWHERE c.customer_id IN (\n  SELECT customer_id FROM Orders WHERE product_name = 'A'\n)\nAND c.customer_id IN (\n  SELECT customer_id FROM Orders WHERE product_name = 'B'\n)\nAND c.customer_id NOT IN (\n  SELECT customer_id FROM Orders WHERE product_name = 'C'\n)\nORDER BY c.customer_id;`,
        complexity: { time: 'O(N²) naive', space: 'O(N)' }
    },
    {
        id: 'sql-8',
        title: 'Second Highest Salary',
        difficulty: 'medium',
        topic: 'Window Functions',
        leetcodeUrl: 'https://leetcode.com/problems/second-highest-salary/',
        statement: `Table: Employee\n\n| Column Name | Type |\n|-------------|------|\n| id          | int  |\n| salary      | int  |\n\nWrite an SQL query to report the second highest salary from the Employee table. If there is no second highest salary, the query should report null.`,
        explanation: `Use LIMIT/OFFSET or a subquery with MAX(). The LIMIT 1 OFFSET 1 approach after ordering by salary DESC is clean. Wrap in a SELECT to return NULL if no result exists.`,
        approach: [
            'Select DISTINCT salaries ordered by DESC',
            'Skip the first (highest) using OFFSET 1',
            'Take LIMIT 1',
            'Wrap in outer SELECT to return NULL when empty'
        ],
        solution: `SELECT (\n  SELECT DISTINCT salary\n  FROM Employee\n  ORDER BY salary DESC\n  LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;`,
        complexity: { time: 'O(N log N)', space: 'O(N)' }
    },
    {
        id: 'sql-9',
        title: 'Department Top Three Salaries',
        difficulty: 'hard',
        topic: 'Window Functions',
        leetcodeUrl: 'https://leetcode.com/problems/department-top-three-salaries/',
        statement: `Table: Employee\n\n| Column Name  | Type    |\n|--------------|----------|\n| id           | int      |\n| name         | varchar  |\n| salary       | int      |\n| departmentId | int      |\n\nTable: Department\n\n| Column Name | Type    |\n|-------------|----------|\n| id          | int      |\n| name        | varchar  |\n\nA company's executives are interested in seeing who earns a high salary in each of the company's departments. Write an SQL query to find the employees who are high earners in each of the departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.`,
        explanation: `Use DENSE_RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC). Filter where rank <= 3. DENSE_RANK ensures ties count as the same rank (unlike ROW_NUMBER).`,
        approach: [
            'Use DENSE_RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC)',
            'Filter WHERE rank <= 3',
            'JOIN with Department table to get department names',
            'DENSE_RANK handles salary ties correctly'
        ],
        solution: `WITH RankedSalaries AS (\n  SELECT e.*, d.name AS departmentName,\n    DENSE_RANK() OVER (\n      PARTITION BY e.departmentId\n      ORDER BY e.salary DESC\n    ) AS salary_rank\n  FROM Employee e\n  JOIN Department d ON e.departmentId = d.id\n)\nSELECT departmentName AS Department,\n  name AS Employee,\n  salary AS Salary\nFROM RankedSalaries\nWHERE salary_rank <= 3\nORDER BY Department, Salary DESC;`,
        complexity: { time: 'O(N log N)', space: 'O(N)' }
    },
    {
        id: 'sql-10',
        title: 'Find Managers With At Least 5 Reports',
        difficulty: 'medium',
        topic: 'Self Join',
        leetcodeUrl: 'https://leetcode.com/problems/managers-with-at-least-5-direct-reports/',
        statement: `Table: Employee\n\n| Column Name | Type    |\n|-------------|----------|\n| id          | int      |\n| name        | varchar  |\n| department  | varchar  |\n| managerId   | int      |\n\nWrite an SQL query to find managers with at least five direct reports.`,
        explanation: `Group the employee table by managerId and count employees per manager. Filter with HAVING COUNT(*) >= 5. Then join back to get the manager's name.`,
        approach: [
            'Group Employees by managerId',
            'HAVING COUNT(*) >= 5',
            'JOIN back to Employee table on id = managerId',
            'Return the manager\'s name'
        ],
        solution: `SELECT e.name\nFROM Employee e\nWHERE e.id IN (\n  SELECT managerId\n  FROM Employee\n  WHERE managerId IS NOT NULL\n  GROUP BY managerId\n  HAVING COUNT(*) >= 5\n);`,
        complexity: { time: 'O(N)', space: 'O(N)' }
    },
    {
        id: 'sql-11',
        title: 'Rising Temperature',
        difficulty: 'easy',
        topic: 'Self Join',
        leetcodeUrl: 'https://leetcode.com/problems/rising-temperature/',
        statement: `Table: Weather\n\n| Column Name   | Type |\n|----------------|------|\n| id            | int  |\n| recordDate    | date |\n| temperature   | int  |\n\nWrite an SQL query to find all dates' IDs with higher temperatures compared to their previous dates (yesterday).`,
        explanation: `Self-join the table where DATEDIFF(w1.recordDate, w2.recordDate) = 1 and w1.temperature > w2.temperature. This pairs each day with the previous day.`,
        approach: [
            'Self-join Weather as w1 and w2',
            'Join condition: DATEDIFF(w1.recordDate, w2.recordDate) = 1',
            'Filter: w1.temperature > w2.temperature',
            'Return w1.id'
        ],
        solution: `SELECT w1.id\nFROM Weather w1\nJOIN Weather w2\n  ON DATEDIFF(w1.recordDate, w2.recordDate) = 1\nWHERE w1.temperature > w2.temperature;`,
        complexity: { time: 'O(N²) naive, O(N log N) with index', space: 'O(N)' }
    },
    {
        id: 'sql-12',
        title: 'Consecutive Available Seats',
        difficulty: 'medium',
        topic: 'Self Join',
        leetcodeUrl: 'https://leetcode.com/problems/consecutive-available-seats/',
        statement: `Table: Cinema\n\n| Column Name | Type |\n|-------------|------|\n| seat_id     | int  |\n| free        | bool |\n\nWrite an SQL query to find all the consecutive available seats in the cinema. Two seats are consecutive if their seat_ids differ by 1.`,
        explanation: `Self-join Cinema on |a.seat_id - b.seat_id| = 1, both must be free. Avoid duplicates by using a.seat_id < b.seat_id and flatten with UNION or SELECT DISTINCT.`,
        approach: [
            'Self-join Cinema as a and b',
            'Condition: ABS(a.seat_id - b.seat_id) = 1',
            'Both a.free = 1 AND b.free = 1',
            'SELECT DISTINCT and ORDER BY seat_id'
        ],
        solution: `SELECT DISTINCT a.seat_id\nFROM Cinema a\nJOIN Cinema b ON ABS(a.seat_id - b.seat_id) = 1\nWHERE a.free = 1 AND b.free = 1\nORDER BY a.seat_id;`,
        complexity: { time: 'O(N²) naive', space: 'O(N)' }
    }
];

export const SQL_TOPICS = ['All', 'Joins', 'Aggregation', 'Window Functions', 'Self Join', 'Conditional', 'Set Operations'];
