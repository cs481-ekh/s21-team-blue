export interface TestResults {
    id: string,
    test_id: string,
    description: string,
    date: string,
    value: string
}

export interface Test {
    test_id: string,
    test_name: string,
    test_description: string,
    test_history: TestResults[],
    operating_systems: string,
    api_path: string
}
