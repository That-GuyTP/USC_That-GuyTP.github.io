package edu.mtc.egr281.chapter03;

import java.util.Scanner;

public class SimpleNestedIf {

	public static void main(String[] args) {
		
		//Declaration
		Scanner kb = new Scanner(System.in);
		
		System.out.print("Do you want too see a movie? ");
		String answer = kb.next();
		
		//Echo
		System.out.println(answer);
		
		if("YES".equalsIgnoreCase(answer)) {
			
			System.out.println("Sweet!!");
				System.out.println("How much $$ you got? ");
				double money = kb.nextDouble();
			
				if(money < 40.0) {
				System.out.println("Darn, maybe another time");
				} else {
				System.out.println("Let's go!!");
				}//EOC nested if(money)
		} else {
			System.out.println("Maybe another time");	
		}//EOC if(answer)
		
		//Close Scanner
		kb.close();
		
	}//EOC main
	
}//EOC SimpleNestedIf
