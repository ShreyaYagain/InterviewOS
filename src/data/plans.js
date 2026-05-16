// ═══════════════════════════════════════════════════════════
// Interview Preparation Plans — Multiple Durations
// ═══════════════════════════════════════════════════════════

export const PLANS = {
    "90": [
        {
            week: 1, theme: 'Arrays & Strings',
            days: [
                { day: 1, title: 'Arrays Basics', tasks: ['Learn array operations: insert, delete, traverse', 'Solve: Two Sum, Best Time to Buy and Sell Stock', 'Solve: Contains Duplicate, Maximum Subarray'] },
                { day: 2, title: 'Hashing & Maps', tasks: ['Learn HashMap patterns: frequency count, prefix sum', 'Solve: Group Anagrams, Top K Frequent Elements', 'Solve: Longest Consecutive Sequence'] },
                { day: 3, title: 'Two Pointers', tasks: ['Learn two-pointer technique: opposite ends, same direction', 'Solve: Valid Palindrome, 3Sum, Container With Most Water', 'Solve: Trapping Rain Water'] },
                { day: 4, title: 'Sliding Window', tasks: ['Learn sliding window: fixed and variable size', 'Solve: Longest Substring Without Repeating Characters', 'Solve: Minimum Window Substring, Permutation in String'] },
                { day: 5, title: 'String Manipulation', tasks: ['String operations: reverse, anagram, palindrome checks', 'Solve: Valid Anagram, Group Anagrams, Encode and Decode Strings', 'Solve: Longest Palindromic Substring'] },
                { day: 6, title: 'Prefix Sums & Kadane\'s', tasks: ['Learn prefix sum technique for range queries', 'Learn Kadane\'s algorithm for max subarray', 'Solve: Product of Array Except Self, Maximum Subarray', 'Solve: Running sum variations'] },
                { day: 7, title: 'Arrays Review + Mock', tasks: ['Revisit all week 1 patterns', 'Timed mock: solve 3 problems in 60 min, no hints', 'Review time and space complexity for all solutions'] }
            ]
        },
        {
            week: 2, theme: 'Linked Lists, Stacks & Queues',
            days: [
                { day: 8, title: 'Linked List Basics', tasks: ['Learn: singly vs doubly linked list, pointer manipulation', 'Solve: Reverse Linked List, Merge Two Sorted Lists', 'Solve: Linked List Cycle detection (Floyd\'s algorithm)'] },
                { day: 9, title: 'Fast & Slow Pointers', tasks: ['Learn fast/slow pointer technique', 'Solve: Find Middle of Linked List, Palindrome Linked List', 'Solve: Reorder List, Remove Nth Node From End'] },
                { day: 10, title: 'Stacks', tasks: ['Learn stack: LIFO, monotonic stack', 'Solve: Valid Parentheses, Min Stack, Daily Temperatures', 'Solve: Largest Rectangle in Histogram'] },
                { day: 11, title: 'Queues & Deque', tasks: ['Learn queue, deque, circular queue', 'Solve: Sliding Window Maximum, Design Hit Counter', 'Solve: LRU Cache implementation'] },
                { day: 12, title: 'LRU Cache Deep Dive', tasks: ['Implement LRU Cache from scratch using HashMap + Doubly Linked List', 'Understand O(1) get and put operations', 'Solve: LFU Cache variant'] },
                { day: 13, title: 'Linked List Advanced', tasks: ['Solve: Copy List with Random Pointer', 'Solve: Sort List (merge sort on linked list)', 'Solve: Flatten a Multilevel Doubly Linked List'] },
                { day: 14, title: 'Stack & Queue Review + Mock', tasks: ['Revisit monotonic stack problems', 'Timed mock: 3 problems from stacks and linked lists', 'Review all O(n) solutions and optimize where possible'] }
            ]
        },
        {
            week: 3, theme: 'Trees & Binary Search',
            days: [
                { day: 15, title: 'Binary Tree Basics', tasks: ['Learn: tree traversal — inorder, preorder, postorder', 'Solve: Invert Binary Tree, Maximum Depth of Binary Tree', 'Solve: Same Tree, Subtree of Another Tree'] },
                { day: 16, title: 'BFS on Trees', tasks: ['Learn level-order traversal using queue', 'Solve: Binary Tree Level Order Traversal', 'Solve: Right Side View, Average of Levels, Zigzag Traversal'] },
                { day: 17, title: 'Tree Path Problems', tasks: ['Solve: Path Sum, Path Sum II, Binary Tree Maximum Path Sum', 'Learn: backtracking on trees', 'Solve: Sum Root to Leaf Numbers'] },
                { day: 18, title: 'BST Operations', tasks: ['Learn BST properties: insert, delete, search', 'Solve: Validate BST, Kth Smallest in BST', 'Solve: Lowest Common Ancestor of BST and Binary Tree'] },
                { day: 19, title: 'Binary Search', tasks: ['Learn binary search template: left/right boundary', 'Solve: Binary Search, Search in Rotated Sorted Array', 'Solve: Find Minimum in Rotated Array, Search a 2D Matrix'] },
                { day: 20, title: 'Binary Search Advanced', tasks: ['Solve: Median of Two Sorted Arrays', 'Solve: Koko Eating Bananas, Capacity to Ship Packages', 'Learn: binary search on answer space'] },
                { day: 21, title: 'Trees + Binary Search Mock', tasks: ['Timed mock: 2 tree problems + 1 binary search problem', 'Review DFS vs BFS when to use which', 'Optimize all O(n log n) to O(n) where possible'] }
            ]
        },
        {
            week: 4, theme: 'Graphs & Recursion/Backtracking',
            days: [
                { day: 22, title: 'Graph Basics', tasks: ['Learn: adjacency list vs matrix, directed vs undirected', 'Solve: Number of Islands, Clone Graph', 'Learn: DFS and BFS on graphs'] },
                { day: 23, title: 'Graph BFS', tasks: ['Solve: Rotting Oranges, Walls and Gates', 'Solve: Shortest Path in Binary Matrix', 'Learn: multi-source BFS technique'] },
                { day: 24, title: 'Topological Sort', tasks: ['Learn: topological sort using BFS (Kahn\'s) and DFS', 'Solve: Course Schedule I and II', 'Solve: Alien Dictionary'] },
                { day: 25, title: 'Union Find', tasks: ['Learn: Union-Find data structure with path compression', 'Solve: Number of Connected Components', 'Solve: Redundant Connection, Graph Valid Tree'] },
                { day: 26, title: 'Backtracking Basics', tasks: ['Learn: backtracking template — choose, explore, unchoose', 'Solve: Subsets, Permutations, Combination Sum', 'Solve: Palindrome Partitioning'] },
                { day: 27, title: 'Backtracking Advanced', tasks: ['Solve: N-Queens, Sudoku Solver, Word Search', 'Learn: pruning techniques for backtracking', 'Analyze time complexity of backtracking solutions'] },
                { day: 28, title: 'Graphs + Backtracking Mock', tasks: ['Timed mock: 1 graph problem + 1 backtracking problem', 'Review Union-Find vs BFS for connectivity problems', 'Review all graph traversal patterns'] }
            ]
        },
        {
            week: 5, theme: 'Dynamic Programming Basics',
            days: [
                { day: 29, title: '1D DP Introduction', tasks: ['Learn: top-down (memoization) vs bottom-up (tabulation)', 'Solve: Climbing Stairs, House Robber', 'Solve: Min Cost Climbing Stairs'] },
                { day: 30, title: '1D DP Continued', tasks: ['Solve: House Robber II, Decode Ways', 'Solve: Jump Game, Jump Game II', 'Learn: when to use DP vs greedy'] },
                { day: 31, title: '2D DP', tasks: ['Solve: Unique Paths, Minimum Path Sum', 'Solve: Coin Change, Coin Change II', 'Learn: 2D DP table visualization'] },
                { day: 32, title: 'Subsequence DP', tasks: ['Solve: Longest Common Subsequence, Longest Increasing Subsequence', 'Solve: Edit Distance', 'Learn: subsequence vs substring DP patterns'] },
                { day: 33, title: 'Knapsack Pattern', tasks: ['Solve: 0/1 Knapsack, Partition Equal Subset Sum', 'Solve: Target Sum, Last Stone Weight II', 'Learn: knapsack state transitions'] },
                { day: 34, title: 'Interval & String DP', tasks: ['Solve: Word Break, Palindromic Substrings', 'Solve: Burst Balloons, Regular Expression Matching', 'Learn: interval DP pattern'] },
                { day: 35, title: 'DP Review + Mock', tasks: ['Timed mock: 2 DP problems under 45 min each', 'Review all DP patterns: 1D, 2D, knapsack, subsequence', 'Practice explaining DP state transitions out loud'] }
            ]
        },
        {
            week: 6, theme: 'Heaps, Tries & Advanced Patterns',
            days: [
                { day: 36, title: 'Heap Basics', tasks: ['Learn: min-heap, max-heap, heapify', 'Solve: Kth Largest Element, Top K Frequent Elements', 'Solve: K Closest Points to Origin'] },
                { day: 37, title: 'Two Heaps Pattern', tasks: ['Learn: two heaps for median finding', 'Solve: Find Median from Data Stream', 'Solve: Sliding Window Median'] },
                { day: 38, title: 'Tries', tasks: ['Learn: Trie data structure — insert, search, prefix', 'Implement Trie from scratch', 'Solve: Word Search II, Design Add and Search Words'] },
                { day: 39, title: 'Greedy Algorithms', tasks: ['Learn: greedy choice property, when greedy works', 'Solve: Jump Game, Gas Station, Hand of Straights', 'Solve: Merge Intervals, Non-overlapping Intervals'] },
                { day: 40, title: 'Advanced Graph — Dijkstra', tasks: ['Learn: Dijkstra\'s shortest path with priority queue', 'Solve: Network Delay Time, Cheapest Flights Within K Stops', 'Solve: Path With Minimum Effort'] },
                { day: 41, title: 'Advanced Graph — Bellman-Ford & Floyd-Warshall', tasks: ['Learn: Bellman-Ford for negative weights', 'Learn: Floyd-Warshall for all-pairs shortest path', 'Solve: Find the City With Smallest Number of Neighbors'] },
                { day: 42, title: 'Advanced Patterns Mock', tasks: ['Timed mock: 1 heap + 1 trie + 1 graph problem', 'Review when to use which advanced data structure', 'Full complexity analysis of all week 6 problems'] }
            ]
        },
        {
            week: 7, theme: 'OOP & SOLID Principles',
            days: [
                { day: 43, title: 'OOP Fundamentals', tasks: ['Review: encapsulation, abstraction, inheritance, polymorphism', 'Practice: design a BankAccount class hierarchy', 'Write code: override methods, use interfaces'] },
                { day: 44, title: 'SOLID — S and O', tasks: ['Single Responsibility: refactor a God class into focused classes', 'Open/Closed: add new payment method without modifying existing code', 'Code exercise: apply both principles to a notification system'] },
                { day: 45, title: 'SOLID — L, I and D', tasks: ['Liskov: ensure subclass substitutability, fix violations', 'Interface Segregation: split fat interfaces into lean ones', 'Dependency Inversion: inject dependencies, remove tight coupling'] },
                { day: 46, title: 'Design Patterns — Creational', tasks: ['Singleton, Factory, Abstract Factory, Builder', 'Implement: Logger using Singleton', 'Implement: ShapeFactory using Factory pattern'] },
                { day: 47, title: 'Design Patterns — Structural', tasks: ['Adapter, Decorator, Facade, Proxy, Composite', 'Implement: Coffee order system using Decorator', 'Implement: Payment gateway using Adapter'] },
                { day: 48, title: 'Design Patterns — Behavioral', tasks: ['Observer, Strategy, Command, Iterator, State', 'Implement: Notification system using Observer', 'Implement: Sorting algorithm selector using Strategy'] },
                { day: 49, title: 'OOP Review', tasks: ['Review all 5 SOLID principles with examples', 'Review all 3 pattern categories with real use cases', 'Write a mini system using at least 3 patterns together'] }
            ]
        },
        {
            week: 8, theme: 'Design Patterns & LLD Practice',
            days: [
                { day: 50, title: 'LLD Introduction', tasks: ['Learn: class diagrams, UML notation', 'Design: Parking Lot system — classes, interfaces, relationships', 'Identify design patterns used in Parking Lot'] },
                { day: 51, title: 'LLD — Elevator System', tasks: ['Design Elevator system with multiple cars and floors', 'Apply: State pattern for elevator states', 'Apply: Strategy pattern for scheduling algorithms'] },
                { day: 52, title: 'LLD — BookMyShow', tasks: ['Design movie ticket booking system', 'Handle: concurrent seat selection, payment flow', 'Apply: Singleton for seat lock manager'] },
                { day: 53, title: 'LLD — Rate Limiter', tasks: ['Implement Token Bucket algorithm', 'Implement Sliding Window Counter algorithm', 'Compare: time/space tradeoffs of each approach'] },
                { day: 54, title: 'LLD — Chess Engine', tasks: ['Design chess piece hierarchy using inheritance', 'Apply: Factory pattern for piece creation', 'Apply: Command pattern for move history (undo/redo)'] },
                { day: 55, title: 'LLD — Snake and Ladder', tasks: ['Design Snake and Ladder game', 'Handle: multiple players, dice rolling, board state', 'Apply: Observer pattern for game events'] },
                { day: 56, title: 'LLD Mock', tasks: ['Timed: design any system in 45 min, explain all choices', 'Review: SOLID violations to avoid in interviews', 'Practice: explaining class hierarchies out loud'] }
            ]
        },
        {
            week: 9, theme: 'HLD Fundamentals',
            days: [
                { day: 57, title: 'Scalability Basics', tasks: ['Learn: vertical vs horizontal scaling', 'Learn: load balancing — round robin, least connections, IP hash', 'Learn: stateless vs stateful services'] },
                { day: 58, title: 'Databases', tasks: ['SQL vs NoSQL: when to use which', 'Learn: indexing, query optimization, ACID properties', 'Learn: replication, master-slave setup'] },
                { day: 59, title: 'CAP Theorem & Consistency', tasks: ['Learn: CAP theorem — Consistency, Availability, Partition Tolerance', 'Learn: eventual consistency vs strong consistency', 'Learn: BASE vs ACID, when each applies'] },
                { day: 60, title: 'Caching', tasks: ['Learn: cache-aside, write-through, write-behind strategies', 'Learn: Redis vs Memcached, eviction policies (LRU, LFU)', 'Learn: CDN for static asset caching'] },
                { day: 61, title: 'Message Queues', tasks: ['Learn: async communication, Kafka vs RabbitMQ vs SQS', 'Learn: pub-sub pattern, consumer groups, partitions', 'Learn: when to use queues vs direct API calls'] },
                { day: 62, title: 'API Design', tasks: ['Learn: REST vs GraphQL vs gRPC', 'Learn: rate limiting, API gateway, idempotency keys', 'Learn: pagination, versioning, backward compatibility'] },
                { day: 63, title: 'HLD Fundamentals Review', tasks: ['Review all HLD building blocks: LB, Cache, DB, Queue, CDN', 'Draw a reference architecture diagram from memory', 'Practice: explain each component\'s role in 2 sentences'] }
            ]
        },
        {
            week: 10, theme: 'HLD Practice Problems',
            days: [
                { day: 64, title: 'Design URL Shortener', tasks: ['Requirements: shorten URL, redirect, analytics', 'Components: API, DB (SQL), cache (Redis), hash function', 'Handle: collision resolution, custom aliases, expiry'] },
                { day: 65, title: 'Design Twitter/News Feed', tasks: ['Requirements: post, follow, timeline generation', 'Components: Fan-out on write vs read, ranking service', 'Handle: celebrity problem, timeline caching'] },
                { day: 66, title: 'Design WhatsApp', tasks: ['Requirements: 1-on-1 chat, group chat, media, online status', 'Components: WebSocket server, message queue, media storage', 'Handle: message delivery receipts, offline messages'] },
                { day: 67, title: 'Design Netflix', tasks: ['Requirements: video upload, streaming, recommendations', 'Components: CDN, adaptive bitrate streaming, encoding pipeline', 'Handle: global distribution, surge traffic'] },
                { day: 68, title: 'Design Uber', tasks: ['Requirements: rider request, driver matching, real-time tracking', 'Components: location service, matching algorithm, surge pricing', 'Handle: geospatial indexing, WebSocket for live tracking'] },
                { day: 69, title: 'Design Payment Gateway', tasks: ['Requirements: process payment, refund, reconciliation', 'Components: idempotency keys, ledger DB, webhook delivery', 'Handle: double charge prevention, partial failures'] },
                { day: 70, title: 'HLD Mock', tasks: ['Pick any system, design in 45 min end to end', 'Include: requirements, capacity estimation, component diagram', 'Justify every technology choice'] }
            ]
        },
        {
            week: 11, theme: 'LLD Practice + HLD Advanced',
            days: [
                { day: 71, title: 'LLD Revision — Top 3 systems', tasks: ['Re-design Rate Limiter, Parking Lot, BookMyShow from scratch', 'Focus: class relationships and pattern identification'] },
                { day: 72, title: 'HLD Advanced — Distributed Databases', tasks: ['Learn: sharding strategies (range, hash, directory)', 'Learn: consistent hashing with virtual nodes', 'Learn: distributed transactions, 2-phase commit'] },
                { day: 73, title: 'HLD Advanced — Search Systems', tasks: ['Design Google Search indexing pipeline', 'Learn: inverted index, MapReduce, PageRank basics', 'Design: Typeahead/autocomplete system'] },
                { day: 74, title: 'HLD Advanced — Notification System', tasks: ['Design push/email/SMS notification service', 'Handle: fan-out to millions, deduplication, retry logic', 'Components: template engine, delivery tracking, opt-out'] },
                { day: 75, title: 'Combined LLD + HLD — Design Zepto', tasks: ['LLD: Order class, InventoryManager, DeliveryAgent hierarchy', 'HLD: real-time inventory, 10-min routing, warehouse coordination', 'Handle: concurrent orders, stock reservation'] },
                { day: 76, title: 'Combined LLD + HLD — Design Notion', tasks: ['LLD: Block data model, workspace hierarchy', 'HLD: CRDTs for real-time collaboration, offline sync', 'Handle: conflict resolution, version history'] },
                { day: 77, title: 'Full System Design Sprint', tasks: ['Design 2 systems back to back, 30 min each', 'Peer review: explain to someone and get questions', 'Identify top 3 weak areas to revisit'] }
            ]
        },
        {
            week: 12, theme: 'Behavioral & Mock Interviews',
            days: [
                { day: 78, title: 'STAR Method Deep Dive', tasks: ['Learn: STAR framework', 'Write out 5 personal STAR stories from past projects', 'Practice: telling each story in under 3 minutes'] },
                { day: 79, title: 'Leadership & Ownership Stories', tasks: ['Prepare: "Tell me about a time you led a project"', 'Prepare: "Tell me about a time you took ownership of a failure"', 'Prepare: "Tell me about a time you influenced without authority"'] },
                { day: 80, title: 'Conflict & Collaboration Stories', tasks: ['Prepare: "Tell me about a disagreement with a teammate"', 'Prepare: "Tell me about working with a difficult stakeholder"', 'Prepare: "Tell me about a time you gave difficult feedback"'] },
                { day: 81, title: 'Failure & Growth Stories', tasks: ['Prepare: "Tell me about your biggest failure"', 'Prepare: "Tell me about a time you missed a deadline"', 'Prepare: "What would you do differently at your last job?"'] },
                { day: 82, title: 'Bar Raiser Questions', tasks: ['Prepare: "What would you change about how engineering is done?"', 'Prepare: "Tell me about something you built that you\'re embarrassed by now"', 'Prepare: "What\'s the most complex system you\'ve ever worked on?"'] },
                { day: 83, title: 'Mock Behavioral Round', tasks: ['Timed: 5 behavioral questions, 3 min each', 'Record yourself, review for filler words and vague answers', 'Refine 3 stories that felt weakest'] },
                { day: 84, title: 'Full Behavioral Mock', tasks: ['Simulate a real 45-min behavioral interview', 'Include: introduction, 5 questions, questions for interviewer', 'Rate yourself: did you own failures? Were answers specific?'] }
            ]
        },
        {
            week: 13, theme: 'Final Sprint & Full Mocks',
            days: [
                { day: 85, title: 'DSA Rapid Fire Revision', tasks: ['Revisit top 20 most common patterns', 'Solve 5 medium problems timed, no hints', 'Review any patterns that felt slow'] },
                { day: 86, title: 'LLD Rapid Fire Revision', tasks: ['Re-design 2 systems from scratch in 30 min each', 'Focus: clean interfaces, correct patterns, no SOLID violations'] },
                { day: 87, title: 'HLD Rapid Fire Revision', tasks: ['Design 2 systems end to end in 30 min each', 'Include: capacity estimation, component selection, justification'] },
                { day: 88, title: 'Behavioral Rapid Fire', tasks: ['Run through all 10 prepared STAR stories out loud', 'Time each one: must be under 3 minutes', 'Polish the weakest 3'] },
                { day: 89, title: 'Full Mock Round 1', tasks: ['Simulate: DSA Round (60 min, 2 problems, no hints)', 'Simulate: LLD Round (45 min, 1 system design)', 'Score yourself: did you clarify requirements first?'] },
                { day: 90, title: 'Final Review Day', tasks: ['Review all scores from mock rounds', 'Write down top 5 things to remember on interview day', 'Rest, eat well, prep your environment'] }
            ]
        }
    ],
    "60": [
        { 
            week: 1, theme: 'Arrays, Strings & Two Pointers', 
            days: [
                { day: 1, title: 'Arrays & Hashing', tasks: ['Solve: Two Sum, Contains Duplicate, Valid Anagram', 'Learn: HashMap frequency counting pattern', 'Solve: Group Anagrams, Top K Frequent Elements'] },
                { day: 2, title: 'Two Pointers', tasks: ['Solve: Valid Palindrome, 3Sum, Container With Most Water', 'Learn: opposite-end pointer technique', 'Solve: Trapping Rain Water'] },
                { day: 3, title: 'Sliding Window', tasks: ['Solve: Longest Substring Without Repeating Characters', 'Solve: Minimum Window Substring, Permutation in String', 'Learn: variable vs fixed window patterns'] },
                { day: 4, title: 'Prefix Sums & Kadane\'s', tasks: ['Solve: Product of Array Except Self, Maximum Subarray', 'Solve: Subarray Sum Equals K', 'Learn: when prefix sum beats brute force'] },
                { day: 5, title: 'Strings Deep Dive', tasks: ['Solve: Longest Palindromic Substring, Encode/Decode Strings', 'Solve: Find All Anagrams in String', 'Learn: Rabin-Karp rolling hash concept'] },
                { day: 6, title: 'Stacks & Queues', tasks: ['Solve: Valid Parentheses, Min Stack, Daily Temperatures', 'Solve: Largest Rectangle in Histogram', 'Learn: monotonic stack pattern'] },
                { day: 7, title: 'Week 1 Review + Mock', tasks: ['Timed: 3 problems from week 1 topics, 60 min total', 'Review complexity of all solutions', 'Identify weakest area to revisit tomorrow'] }
            ] 
        },
        { 
            week: 2, theme: 'Linked Lists, Trees & Binary Search', 
            days: [
                { day: 8, title: 'Linked Lists', tasks: ['Solve: Reverse Linked List, Merge Two Sorted Lists', 'Solve: Linked List Cycle, Reorder List', 'Learn: fast/slow pointer technique'] },
                { day: 9, title: 'Trees — DFS', tasks: ['Solve: Invert Binary Tree, Max Depth, Same Tree', 'Solve: Path Sum, Binary Tree Maximum Path Sum', 'Learn: recursive DFS on trees'] },
                { day: 10, title: 'Trees — BFS', tasks: ['Solve: Level Order Traversal, Right Side View', 'Solve: Lowest Common Ancestor, Validate BST', 'Learn: BFS queue pattern on trees'] },
                { day: 11, title: 'Binary Search', tasks: ['Solve: Binary Search, Search in Rotated Array', 'Solve: Find Minimum in Rotated, Koko Eating Bananas', 'Learn: binary search on answer space'] },
                { day: 12, title: 'Heaps', tasks: ['Solve: Kth Largest, Top K Frequent, K Closest Points', 'Solve: Find Median from Data Stream', 'Learn: when to use heap over sort'] },
                { day: 13, title: 'Tries', tasks: ['Implement Trie from scratch', 'Solve: Word Search II, Design Add and Search Words', 'Learn: prefix tree applications'] },
                { day: 14, title: 'Week 2 Review + Mock', tasks: ['Timed: 1 tree + 1 binary search + 1 heap problem', 'Review all traversal patterns', 'Write time/space complexity for every solution'] }
            ] 
        },
        { 
            week: 3, theme: 'Graphs, DP & Backtracking', 
            days: [
                { day: 15, title: 'Graph DFS & BFS', tasks: ['Solve: Number of Islands, Clone Graph, Rotting Oranges', 'Learn: adjacency list construction', 'Solve: Pacific Atlantic Water Flow'] },
                { day: 16, title: 'Graph Advanced', tasks: ['Solve: Course Schedule (topological sort)', 'Solve: Number of Connected Components, Graph Valid Tree', 'Learn: Union-Find with path compression'] },
                { day: 17, title: 'Dynamic Programming 1D', tasks: ['Solve: Climbing Stairs, House Robber, Decode Ways', 'Solve: Jump Game, Min Cost Climbing Stairs', 'Learn: DP state definition pattern'] },
                { day: 18, title: 'Dynamic Programming 2D', tasks: ['Solve: Unique Paths, Coin Change, Longest Common Subsequence', 'Solve: Edit Distance, Partition Equal Subset Sum', 'Learn: 2D table visualization'] },
                { day: 19, title: 'Backtracking', tasks: ['Solve: Subsets, Permutations, Combination Sum', 'Solve: Word Search, N-Queens', 'Learn: choose-explore-unchoose template'] },
                { day: 20, title: 'Greedy', tasks: ['Solve: Jump Game II, Gas Station, Merge Intervals', 'Solve: Non-overlapping Intervals, Hand of Straights', 'Learn: when greedy beats DP'] },
                { day: 21, title: 'Week 3 Review + Mock', tasks: ['Timed: 1 graph + 1 DP + 1 backtracking, 75 min', 'Review all graph algorithms', 'Identify DP patterns by name'] }
            ] 
        },
        { 
            week: 4, theme: 'OOP, SOLID & Design Patterns', 
            days: [
                { day: 22, title: 'OOP + SOLID', tasks: ['Review: 4 pillars of OOP with code examples', 'Apply: Single Responsibility and Open/Closed to a service class', 'Fix: SOLID violations in provided code snippets'] },
                { day: 23, title: 'Creational Patterns', tasks: ['Implement: Singleton Logger, Factory for shapes', 'Implement: Builder for complex config objects', 'Identify: which pattern solves which problem'] },
                { day: 24, title: 'Structural Patterns', tasks: ['Implement: Decorator for coffee order system', 'Implement: Adapter for third-party payment integration', 'Implement: Facade for complex subsystem'] },
                { day: 25, title: 'Behavioral Patterns', tasks: ['Implement: Observer for event notification system', 'Implement: Strategy for sorting algorithm selection', 'Implement: Command for undo/redo functionality'] },
                { day: 26, title: 'LLD — Rate Limiter + Parking Lot', tasks: ['Design Rate Limiter: token bucket + sliding window', 'Design Parking Lot: classes, interfaces, states', 'Identify all patterns used in each'] },
                { day: 27, title: 'LLD — BookMyShow + Elevator', tasks: ['Design BookMyShow: seat selection, payment, booking flow', 'Design Elevator: state machine, scheduling strategy', 'Combine: use 3+ patterns per system'] },
                { day: 28, title: 'LLD Mock', tasks: ['Timed: design any system in 45 min', 'Explain all class relationships and pattern choices', 'Review SOLID compliance of your design'] }
            ] 
        },
        { 
            week: 5, theme: 'HLD Fundamentals + Practice', 
            days: [
                { day: 29, title: 'HLD Building Blocks', tasks: ['Learn: Load Balancer, CDN, Cache, DB, Message Queue', 'Draw: reference architecture with all components', 'Understand: when to add each component'] },
                { day: 30, title: 'Database Deep Dive', tasks: ['SQL vs NoSQL decision framework', 'Sharding, replication, indexing strategies', 'CAP theorem: which DB gives which guarantee'] },
                { day: 31, title: 'Design URL Shortener', tasks: ['Requirements, capacity estimation, API design', 'Components: hash function, Redis cache, SQL DB', 'Handle: collisions, custom URLs, expiry, analytics'] },
                { day: 32, title: 'Design WhatsApp', tasks: ['Requirements: 1-on-1, group chat, media, status', 'Components: WebSocket, message queue, S3, presence service', 'Handle: delivery receipts, offline messages, end-to-end encryption'] },
                { day: 33, title: 'Design Uber', tasks: ['Requirements: request ride, match driver, track live', 'Components: location service, geospatial index, surge pricing', 'Handle: 10M concurrent users, driver pings every 5 seconds'] },
                { day: 34, title: 'Design Payment Gateway', tasks: ['Requirements: payment, refund, reconciliation', 'Components: idempotency, ledger, webhook, retry', 'Handle: double charge prevention, partial failures'] },
                { day: 35, title: 'HLD Mock', tasks: ['Timed: design any system in 45 min end to end', 'Include: requirements, scale estimates, diagram, justification', 'Get feedback by explaining to someone else'] }
            ] 
        },
        { 
            week: 6, theme: 'Behavioral Prep + Mixed Practice', 
            days: [
                { day: 36, title: 'STAR Stories', tasks: ['Write 5 STAR stories: leadership, failure, conflict, ownership, growth', 'Practice each under 3 minutes', 'Remove all vague language ("we did", replace with "I did")'] },
                { day: 37, title: 'Mixed DSA Practice', tasks: ['Solve 4 random medium problems timed, no hints', 'Review all within 30 min after', 'Fix anything that took more than 25 min'] },
                { day: 38, title: 'Behavioral — Hard Questions', tasks: ['Prepare: "What would you change at your last company?"', 'Prepare: "Tell me about something you built that embarrasses you now"', 'Prepare: "Describe a time you disagreed with your manager and were right"'] },
                { day: 39, title: 'Mixed LLD + HLD', tasks: ['Design 1 LLD system and 1 HLD system, 30 min each', 'Link them: use the LLD as a component in the HLD', 'Explain the complete system end to end'] },
                { day: 40, title: 'Full Mock — DSA + LLD', tasks: ['Simulate: DSA round, 60 min, 2 problems, no hints', 'Simulate: LLD round, 45 min, 1 system', 'Score: did you clarify first? Did you give complexity?'] },
                { day: 41, title: 'Full Mock — HLD + Behavioral', tasks: ['Simulate: HLD round, 45 min, 1 system', 'Simulate: Behavioral, 30 min, 4 STAR questions', 'Review and note weakest areas'] },
                { day: 42, title: 'Final Revision', tasks: ['Review all STAR stories one more time', 'Quick-solve 3 problems from earlier in the plan', 'Rest and prepare mindset for interviews'] }
            ] 
        },
        { 
            week: 7, theme: 'LLD Practice + HLD Advanced', 
            days: [
                { day: 43, title: 'LLD Revision — Top 3 systems', tasks: ['Re-design Rate Limiter, Parking Lot, BookMyShow from scratch', 'Focus: class relationships and pattern identification'] },
                { day: 44, title: 'HLD Advanced — Distributed Databases', tasks: ['Learn: sharding strategies (range, hash, directory)', 'Learn: consistent hashing with virtual nodes', 'Learn: distributed transactions, 2-phase commit'] },
                { day: 45, title: 'HLD Advanced — Search Systems', tasks: ['Design Google Search indexing pipeline', 'Learn: inverted index, MapReduce, PageRank basics', 'Design: Typeahead/autocomplete system'] },
                { day: 46, title: 'HLD Advanced — Notification System', tasks: ['Design push/email/SMS notification service', 'Handle: fan-out to millions, de-duplication, retry logic', 'Components: template engine, delivery tracking, opt-out'] },
                { day: 47, title: 'Combined LLD + HLD — Design Zepto', tasks: ['LLD: Order class, InventoryManager, DeliveryAgent hierarchy', 'HLD: real-time inventory, 10-min routing, warehouse coordination', 'Handle: concurrent orders, stock reservation'] },
                { day: 48, title: 'Combined LLD + HLD — Design Notion', tasks: ['LLD: Block data model, workspace hierarchy', 'HLD: CRDTs for real-time collaboration, offline sync', 'Handle: conflict resolution, version history'] },
                { day: 49, title: 'Full System Design Sprint', tasks: ['Design 2 systems back to back, 30 min each', 'Peer review: explain to someone and get questions', 'Identify top 3 weak areas to revisit'] }
            ] 
        },
        { 
            week: 8, theme: 'Behavioral & Mock Interviews', 
            days: [
                { day: 50, title: 'STAR Method Deep Dive', tasks: ['Learn: Situation, Task, Action, Result format', 'Write out 5 personal STAR stories from past projects', 'Practice: telling each story in under 3 minutes'] },
                { day: 51, title: 'Leadership & Ownership Stories', tasks: ['Prepare: "Tell me about a time you led a project"', 'Prepare: "Tell me about a time you took ownership of a failure"', 'Prepare: "Tell me about a time you influenced without authority"'] },
                { day: 52, title: 'Conflict & Collaboration Stories', tasks: ['Prepare: "Tell me about a disagreement with a teammate"', 'Prepare: "Tell me about working with a difficult stakeholder"', 'Prepare: "Tell me about a time you gave difficult feedback"'] },
                { day: 53, title: 'Failure & Growth Stories', tasks: ['Prepare: "Tell me about your biggest failure"', 'Prepare: "Tell me about a time you missed a deadline"', 'Prepare: "What would you do differently at your last job?"'] },
                { day: 54, title: 'Bar Raiser Questions', tasks: ['Prepare: "What would you change about how engineering is done?"', 'Prepare: "Tell me about something you built that you\'re embarrassed by now"', 'Prepare: "What\'s the most complex system you\'ve ever worked on?"'] },
                { day: 55, title: 'Mock Behavioral Round', tasks: ['Timed: 5 behavioral questions, 3 min each', 'Record yourself, review for filler words and vague answers', 'Refine 3 stories that felt weakest'] },
                { day: 56, title: 'Full Behavioral Mock', tasks: ['Simulate a real 45-min behavioral interview', 'Include: introduction, 5 questions, questions for interviewer', 'Rate yourself: did you own failures? Were answers specific?'] }
            ] 
        },
        { 
            week: 9, theme: 'Final Sprint', 
            days: [
                { day: 57, title: 'DSA Rapid Fire Revision', tasks: ['Revisit top 20 most common patterns', 'Solve 5 medium problems timed, no hints', 'Review any patterns that felt slow'] },
                { day: 58, title: 'LLD Rapid Fire Revision', tasks: ['Re-design 2 systems from scratch in 30 min each', 'Focus: clean interfaces, correct patterns, no SOLID violations'] },
                { day: 59, title: 'HLD Rapid Fire Revision', tasks: ['Design 2 systems end to end in 30 min each', 'Include: capacity estimation, component selection, justification'] },
                { day: 60, title: 'Final Review Day', tasks: ['Review all mock rounds', 'Write down top 5 things to remember on interview day', 'Rest, eat well, prep your environment'] }
            ] 
        }
    ],
    "30": [
        { 
            week: 1, theme: 'DSA Crash Course', 
            days: [
                { day: 1, title: 'Arrays, Hashing & Two Pointers', tasks: ['Solve: Two Sum, 3Sum, Container With Most Water', 'Solve: Longest Consecutive Sequence, Group Anagrams', 'Learn: HashMap and two-pointer patterns in one session'] },
                { day: 2, title: 'Sliding Window + Binary Search', tasks: ['Solve: Minimum Window Substring, Sliding Window Maximum', 'Solve: Search in Rotated Array, Koko Eating Bananas', 'Learn: both templates back to back'] },
                { day: 3, title: 'Trees — Full Coverage', tasks: ['Solve: Level Order Traversal, Max Depth, Path Sum', 'Solve: Validate BST, LCA, Binary Tree Max Path Sum', 'Cover DFS and BFS in one session'] },
                { day: 4, title: 'Graphs — Full Coverage', tasks: ['Solve: Number of Islands, Course Schedule, Clone Graph', 'Solve: Dijkstra (Network Delay Time)', 'Cover BFS, DFS, Union-Find, topological sort'] },
                { day: 5, title: 'DP — Core Patterns', tasks: ['Solve: Climbing Stairs, Coin Change, Longest Common Subsequence', 'Solve: Word Break, Partition Equal Subset Sum', 'Cover 1D and 2D DP in one session'] },
                { day: 6, title: 'Backtracking + Heaps', tasks: ['Solve: Subsets, Permutations, N-Queens', 'Solve: Kth Largest, Find Median from Data Stream', 'Cover backtracking template and heap usage'] },
                { day: 7, title: 'DSA Review + Timed Mock', tasks: ['Revisit 3 problems you got wrong this week', 'Timed mock: 3 problems, 75 min, no hints', 'Write down all pattern names you used this week'] }
            ] 
        },
        { 
            week: 2, theme: 'LLD Core', 
            days: [
                { day: 8, title: 'SOLID Principles', tasks: ['Apply all 5 SOLID principles to a notification service', 'Fix 3 provided SOLID violation examples', 'Design a clean class hierarchy for an e-commerce system'] },
                { day: 9, title: 'Design Patterns Sprint', tasks: ['Implement: Singleton, Factory, Observer, Strategy in one session', 'Build a mini system that uses all 4 patterns', 'Explain each pattern\'s intent in one sentence'] },
                { day: 10, title: 'LLD — Rate Limiter + Parking Lot', tasks: ['Design both systems from scratch, 30 min each', 'Document class hierarchy, interfaces, design patterns used'] },
                { day: 11, title: 'LLD — BookMyShow + Elevator', tasks: ['Design both systems, 30 min each', 'Focus: concurrency handling and state management'] },
                { day: 12, title: 'LLD — Chess + Snake and Ladder', tasks: ['Design both, 25 min each', 'Apply Command pattern for move history', 'Apply State pattern for game states'] },
                { day: 13, title: 'LLD Mock', tasks: ['Timed: design any 2 systems in 45 min each', 'Explain all design decisions out loud'] },
                { day: 14, title: 'LLD Review', tasks: ['Quick-draw class diagrams for all 6 systems from this week', 'Identify which patterns appeared most often', 'Fix any SOLID violations you spot on review'] }
            ] 
        },
        { 
            week: 3, theme: 'HLD Core', 
            days: [
                { day: 15, title: 'HLD Fundamentals', tasks: ['Learn all building blocks: LB, Cache, DB, CDN, Queue', 'Draw reference architecture from memory', 'Understand CAP theorem with 3 real database examples'] },
                { day: 16, title: 'Design URL Shortener + Pastebin', tasks: ['Both in 30 min each', 'Include: API, capacity estimate, DB choice, cache layer'] },
                { day: 17, title: 'Design WhatsApp + Twitter', tasks: ['Both in 30 min each', 'Focus: real-time delivery, fan-out, timeline generation'] },
                { day: 18, title: 'Design Uber + Netflix', tasks: ['Both in 30 min each', 'Focus: geospatial indexing, CDN, adaptive streaming'] },
                { day: 19, title: 'Design Payment + Notification Service', tasks: ['Both in 30 min each', 'Focus: idempotency, reliability, fan-out at scale'] },
                { day: 20, title: 'HLD Mock', tasks: ['Timed: 1 system in 45 min, present it fully', 'Include: requirements, estimates, components, justification'] },
                { day: 21, title: 'HLD Review', tasks: ['Draw all 8 systems from this week from memory (thumbnail sketches)', 'Identify which components appear in most systems', 'Write 1-sentence justification for DB choice in each system'] }
            ] 
        },
        { 
            week: 4, theme: 'Behavioral + Mixed Practice', 
            days: [
                { day: 22, title: 'STAR Method + Story Writing', tasks: ['Write 7 STAR stories covering: leadership, failure, conflict, ownership', 'Practice each under 3 minutes'] },
                { day: 23, title: 'Hard Behavioral Questions', tasks: ['Prepare and practice all bar-raiser level questions', 'Record yourself, watch it back, refine'] },
                { day: 24, title: 'Mixed DSA + LLD Mock', tasks: ['DSA: 2 problems, 50 min', 'LLD: 1 system, 35 min'] },
                { day: 25, title: 'Mixed HLD + Behavioral Mock', tasks: ['HLD: 1 system, 45 min', 'Behavioral: 4 STAR questions, 25 min'] },
                { day: 26, title: 'Full 5-Round Mock', tasks: ['Simulate all 5 rounds back to back', 'DSA (60) → LLD (45) → HLD (45) → Behavioral (30) → Bar Raiser (20)'] },
                { day: 27, title: 'Review + Fix Weak Areas', tasks: ['Review every mock from this week', 'Re-solve the 2 problems you struggled most with', 'Rewrite the 2 STAR stories that felt weak'] },
                { day: 28, title: 'Final Prep', tasks: ['Review all pattern cheat sheets', 'Review all system design components', 'Read through all 7 STAR stories one final time'] }
            ] 
        },
        { 
            week: 5, theme: 'Full Mocks', 
            days: [
                { day: 29, title: 'Mock Round — DSA Only', tasks: ['3 problems: 1 easy, 1 medium, 1 hard', '90 min, no hints, no looking up', 'Score and review after'] },
                { day: 30, title: 'Final Review', tasks: ['Review scores from all this week\'s mocks', 'Write top 3 things to improve before interviews', 'Quick-solve 3 of your weakest problems one more time'] }
            ] 
        }
    ],
    "14": [
        {
            week: 1, theme: 'DSA + LLD',
            days: [
                { day: 1, title: 'Arrays & Hashing', tasks: ['Solve: Two Sum, Group Anagrams, Top K Frequent Elements', 'Solve: Longest Consecutive Sequence, Valid Anagram', 'Learn: HashMap and set patterns'] },
                { day: 2, title: 'Two Pointers & Sliding Window', tasks: ['Solve: Container With Most Water, 3Sum, Trapping Rain Water', 'Solve: Minimum Window Substring, Longest Substring No Repeat', 'Learn: when to use each technique'] },
                { day: 3, title: 'Trees — BFS + DFS', tasks: ['Solve: Level Order, Path Sum, Max Depth, LCA', 'Solve: Validate BST, Binary Tree Max Path Sum', 'Cover both traversals completely'] },
                { day: 4, title: 'DP — 1D + 2D', tasks: ['Solve: Climbing Stairs, House Robber, Coin Change', 'Solve: Longest Common Subsequence, Unique Paths', 'Cover memoization and tabulation'] },
                { day: 5, title: 'Graphs — All Algorithms', tasks: ['Solve: Number of Islands, Course Schedule, Clone Graph', 'Solve: Dijkstra (Network Delay), Union-Find (Connected Components)', 'Cover BFS, DFS, topological sort, shortest path'] },
                { day: 6, title: 'LLD — SOLID + Patterns', tasks: ['Apply all 5 SOLID principles with code examples', 'Implement: Observer, Strategy, Factory, Singleton', 'Design: Rate Limiter class hierarchy'] },
                { day: 7, title: 'LLD Machine Coding', tasks: ['Design Rate Limiter with token bucket algorithm', 'Design Parking Lot end to end', 'Identify all patterns used in each'] }
            ]
        },
        {
            week: 2, theme: 'HLD + Behavioral + Mocks',
            days: [
                { day: 8, title: 'HLD Foundations', tasks: ['Learn all building blocks and when to use each', 'Understand CAP theorem with real database examples', 'Design URL Shortener end to end'] },
                { day: 9, title: 'HLD — Chat + Social', tasks: ['Design WhatsApp: WebSocket, message queue, delivery receipts', 'Design Twitter: fan-out, timeline caching, celebrity problem'] },
                { day: 10, title: 'HLD — Infrastructure Systems', tasks: ['Design Uber: geospatial indexing, real-time tracking', 'Design Payment Gateway: idempotency, ledger, webhooks'] },
                { day: 11, title: 'Behavioral — STAR Sprint', tasks: ['Write and practice 7 STAR stories, 3 min each', 'Prepare all bar-raiser questions', 'Record and review yourself'] },
                { day: 12, title: 'Mock — DSA + LLD', tasks: ['DSA: 2 problems timed, no hints (60 min)', 'LLD: design 1 system (40 min)', 'Review and score yourself'] },
                { day: 13, title: 'Mock — HLD + Behavioral', tasks: ['HLD: design 1 system (45 min)', 'Behavioral: 4 STAR questions (25 min)', 'Review and score yourself'] },
                { day: 14, title: 'Full 5-Round Simulation', tasks: ['All 5 rounds back to back with 10-min breaks', 'Score each round on FAANG 1-4 scale', 'Write 3 things to remember on interview day'] }
            ]
        }
    ],
    "10": [
        { day: 1, title: 'Arrays, Hashing & Two Pointers', tasks: ['Solve: Two Sum, 3Sum, Container With Most Water', 'Solve: Group Anagrams, Longest Consecutive Sequence', 'Learn: HashMap, two-pointer, sliding window patterns'] },
        { day: 2, title: 'Trees + Binary Search', tasks: ['Solve: Level Order, Max Depth, Path Sum, Validate BST', 'Solve: Search in Rotated Array, Koko Eating Bananas', 'Cover DFS, BFS, binary search templates'] },
        { day: 3, title: 'Graphs + DP', tasks: ['Solve: Number of Islands, Course Schedule, Clone Graph', 'Solve: Coin Change, Longest Common Subsequence, Word Break', 'Cover BFS/DFS/topological sort + 1D/2D DP'] },
        { day: 4, title: 'LLD — SOLID + Patterns', tasks: ['Apply all 5 SOLID principles with code', 'Implement: Factory, Observer, Strategy, Singleton', 'Design: Parking Lot class hierarchy'] },
        { day: 5, title: 'LLD Machine Coding', tasks: ['Design Rate Limiter: token bucket + sliding window', 'Design BookMyShow: seat selection, payment, concurrency', 'Explain all design choices and patterns used'] },
        { day: 6, title: 'HLD Fundamentals', tasks: ['Learn: LB, Cache, DB, CDN, Queue, API Gateway', 'Understand CAP theorem with examples', 'Design URL Shortener end to end'] },
        { day: 7, title: 'HLD — 3 Systems', tasks: ['Design WhatsApp, Uber, Payment Gateway', '20 min per system', 'Include: components, scale considerations, DB choice'] },
        { day: 8, title: 'Behavioral STAR Sprint', tasks: ['Write and practice 7 STAR stories covering all dimensions', 'Prepare bar-raiser questions', 'Record yourself, refine weak stories'] },
        { day: 9, title: 'Mixed Mock Round', tasks: ['DSA: 2 problems, 50 min, no hints', 'LLD: 1 system, 35 min', 'Behavioral: 3 STAR questions, 15 min'] },
        { day: 10, title: 'Full FAANG Mock', tasks: ['All 5 rounds back to back', 'DSA (60) → LLD (45) → HLD (45) → Behavioral (30) → Bar Raiser (20)', 'Score yourself, write final notes'] }
    ],
    "7": [
        { day: 1, title: 'DSA Speed Run — All Patterns', tasks: ['Solve: Two Sum, Group Anagrams, Container With Most Water', 'Solve: Level Order Traversal, Coin Change, Number of Islands', 'Cover: HashMap, two-pointer, BFS, DP, graph patterns'] },
        { day: 2, title: 'Trees + Graphs + DP Deep Dive', tasks: ['Solve: Binary Tree Max Path Sum, LCA, Validate BST', 'Solve: Course Schedule, Network Delay Time, Edit Distance', 'Focus on the most tested problems per category'] },
        { day: 3, title: 'LLD Sprint', tasks: ['Apply SOLID, implement 4 design patterns', 'Design Rate Limiter and Parking Lot in 30 min each', 'Explain all choices out loud as if to an interviewer'] },
        { day: 4, title: 'HLD Sprint — 3 Systems', tasks: ['Design URL Shortener, WhatsApp, Uber in 25 min each', 'Include: requirements, components, scale, DB choice', 'Draw a diagram for each'] },
        { day: 5, title: 'Behavioral Sprint', tasks: ['Write and practice all STAR stories: 7 total', 'Prepare bar-raiser questions', 'Record and refine'] },
        { day: 6, title: 'Timed Mock — No Hints', tasks: ['DSA: 2 hard problems, 60 min', 'LLD: design any system, 40 min', 'HLD: design any system, 40 min'] },
        { day: 7, title: 'Full FAANG Mock Day', tasks: ['Simulate all 5 rounds consecutively', 'Score each round 1-4 on FAANG rubric', 'Write: top 5 things to remember going into interviews'] }
    ]
};
