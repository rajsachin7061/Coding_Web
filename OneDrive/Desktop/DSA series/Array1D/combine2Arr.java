package Array1D;



import java.util.*;

 public class combine2Arr{
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter size of array");
        int n = sc.nextInt();

        int arr1[] = new int[n];
        int arr2[] = new int[n];
        int arr3[] = new int[n];

        // Input first array
        System.out.println("Enter first array elements");
        for (int i = 0; i < arr1.length; i++) {
            arr1[i] = sc.nextInt();
        }

        // Input second array
        System.out.println("Enter second array elements");
        for (int i = 0; i < arr2.length; i++) {
            arr2[i] = sc.nextInt();
        }

        // Add arrays
        for (int i = 0; i < n; i++) {
            arr3[i] = arr1[i] + arr2[i];
        }

        // Print result
        System.out.println("Sum of arrays:");

        for (int i = 0; i < arr3.length; i++) {
            System.out.print(arr3[i] + " ");
        }
    }
  }

  

