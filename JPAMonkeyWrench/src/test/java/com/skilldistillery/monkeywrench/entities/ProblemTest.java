package com.skilldistillery.monkeywrench.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProblemTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Problem problem;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAMonkeyWrench");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		problem = em.find(Problem.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		problem = null;
	}
	
	@Test
	void test_Problem_Description_mapping() {
		assertNotNull(problem);
		assertEquals("NO HEAT",problem.getDescription());
	}
	
	//Missing tests for MTM etc.
	@Test
	void test_Problem_Services_mapping() {
		assertNotNull(problem.getServiceCalls());
		assertTrue(problem.getServiceCalls().size() > 1);
	}
}
